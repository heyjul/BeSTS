import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { FullMatch } from 'src/app/shared/models/full-match.model';
import { MatchService } from 'src/app/shared/services/match.service';
import { Room } from '../../models/room.model';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BetDialogComponent } from 'src/app/shared/components/bet-dialog/bet-dialog.component';
import { BetService } from 'src/app/shared/services/bet.service';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrls: ['./single-room.component.scss']
})
export class SingleRoomComponent implements OnInit {

  private _room$!: BehaviorSubject<Room>;
  get room$() {
    return this._room$.asObservable();
  }

  private _matches$!: BehaviorSubject<FullMatch[]>;
  get matches$() {
    return this._matches$.asObservable().pipe(
      map(x => x.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())),
      map(matches => {
        const newMatches = [...matches];

        var prevDay = new Date();
        prevDay.setDate(prevDay.getDate() - 1);
        prevDay.setHours(0, 0, 0, 0);
        const passed = newMatches.splice(0, newMatches.findIndex(match => {
          const d = new Date(match.startDate);
          d.setHours(0, 0, 0, 0);
          return d > prevDay;
        }));
        passed.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

        return newMatches.concat(passed);
      })
    );
  }

  isOwner$!: Observable<boolean>;

  actions = [
    { message: 'VALIDER', color: '#e91e63' },
    { message: 'MODIFIER', color: '#607d8b' },
    { message: 'SUPPRIMER', color: '#f44336' },
  ];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog,
    private matchService: MatchService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private betService: BetService) { }

  ngOnInit(): void {
    this.route.data.pipe(
      first(),
      map(data => new BehaviorSubject(data['room'])),
    ).subscribe(subject => this._room$ = subject);

    this.route.data.pipe(
      first(),
      map(data => new BehaviorSubject(data['matches'])),
    ).subscribe(subject => this._matches$ = subject);

    this.isOwner$ = this.auth.connectedUser$.pipe(
      map(user => user?.id === this._room$.value.ownerId)
    );
  }

  createMatch(): void {
    this.router.navigateByUrl(`/rooms/${this._room$.value.id}/match`);
  }

  remove(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '80%',
      data: 'Êtes vous sûr de vouloir supprimer ce match ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.matchService.delete(id).subscribe(() => {
          this._matches$.next(this._matches$.value.filter(x => x.id !== id));
        });
    });
  }

  scores(id: string): void {
    this.router.navigateByUrl(`/rooms/${id}/scores`);
  }

  copy(id: string): void {
    this.clipboard.copy(id);
    this.snackBar.open('Copié dans le presse-papiers', 'Fermer');
  }

  canBet(startDate: Date | string): boolean {
    return new Date(startDate) > new Date();
  }

  getClass(match: FullMatch): string | undefined {
    if (this.canBet(match.startDate))
      return undefined;
    if (!this.canBet(match.startDate) && match.realTeamOneScore == undefined)
      return 'in-progress';
    if (match.guessedTeamOneScore == undefined || match.guessedTeamTwoScore == undefined)
      return 'failed';
    if (match.guessedTeamOneScore === match.realTeamOneScore && match.guessedTeamTwoScore === match.realTeamTwoScore)
      return 'right-score';
    if ((match.guessedTeamOneScore < match.guessedTeamTwoScore && match.realTeamOneScore! < match.realTeamTwoScore!)
      || (match.guessedTeamOneScore > match.guessedTeamTwoScore && match.realTeamOneScore! > match.realTeamTwoScore!)
      || (match.guessedTeamOneScore === match.guessedTeamTwoScore && match.realTeamOneScore! === match.realTeamTwoScore!))
      return 'right-team';
    return 'failed';

  }

  openBetDialog(match: FullMatch): void {
    if (!this.canBet(match.startDate))
      return;

    const dialogRef = this.dialog.open(BetDialogComponent, {
      width: '80%',
      data: {
        teamOne: match.teamOne,
        teamTwo: match.teamTwo,
        guessedTeamOneScore: match.guessedTeamOneScore,
        guessedTeamTwoScore: match.guessedTeamTwoScore,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result)
        this.betService.createOrUpdate({
          teamOneScore: Number(result.teamOne),
          teamTwoScore: Number(result.teamTwo),
        }, match.id).subscribe(bet => {
          this._matches$.next(this._matches$.value.map(x => {
            if (x.id !== match.id)
              return x;

            x.guessedTeamOneScore = bet.teamOneScore;
            x.guessedTeamTwoScore = bet.teamTwoScore;
            return x;
          }));
        });
    });
  }

  onTouch(action: number, match: FullMatch) {
    switch (action) {
      case 0:
        this.close(match);
        break;
      case 1:
        this.router.navigateByUrl(`/rooms/${this._room$.value.id}/match/${match.id}`);
        break;
      case 2:
        this.remove(match.id);
        break;
    }
  }

  close(match: FullMatch) {
    if (!!match.realTeamOneScore)
      return;

    const dialogRef = this.dialog.open(BetDialogComponent, {
      width: '80%',
      data: {
        teamOne: match.teamOne,
        teamTwo: match.teamTwo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result)
        this.matchService.close(
          match.id,
          {
            teamOneScore: Number(result.teamOne),
            teamTwoScore: Number(result.teamTwo),
          }
        ).subscribe(matchResult => {
          this._matches$.next(this._matches$.value.map(x => {
            if (x.id !== match.id)
              return x;

            x.realTeamOneScore = matchResult.teamOneScore;
            x.realTeamTwoScore = matchResult.teamTwoScore;
            return x;
          }));
        });
    });
  }

  showBets(event: MouseEvent, matchId: string): void {
    event.stopPropagation();
    this.router.navigateByUrl(`/rooms/${this._room$.value.id}/match/${matchId}/bets`)
  }
}
