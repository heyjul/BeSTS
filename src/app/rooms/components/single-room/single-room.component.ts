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
      map(x => x.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()))
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
    this.router.navigateByUrl(`/create-match/${this._room$.value.id}`);
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

  copy(id: string): void {
    this.clipboard.copy(id);
    this.snackBar.open('Copié dans le presse-papiers', 'Fermer');
  }

  canBet(startDate: Date | string): boolean {
    return new Date(startDate) > new Date();
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
        // Validate
        break;
      case 1:
        // Edit
        break;
      case 2:
        this.remove(match.id);
        break;
    }
  }
}
