import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { FullMatch } from 'src/app/shared/models/full-match.model';
import { MatchService } from 'src/app/shared/services/match.service';
import { Room } from '../../models/room.model';

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
    return this._matches$.asObservable();
  }

  isOwner$!: Observable<boolean>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog,
    private matchService: MatchService) { }

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
    this.router.navigateByUrl(`create-match/${this._room$.value.id}`);
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
}
