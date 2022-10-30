import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { Room } from '../../models/room.model';
import { RoomService } from '../../services/room.service';
import { CreateRoomDialogComponent } from '../create-room-dialog/create-room-dialog.component';
import { JoinRoomDialogComponent } from '../join-room-dialog/join-room-dialog.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private roomService: RoomService,
  ) { }

  private _rooms$!: BehaviorSubject<Room[]>;
  get rooms$(): Observable<Room[]> {
    return this._rooms$.asObservable();
  }

  ngOnInit(): void {
    this.route.data.pipe(
      map(data => new BehaviorSubject(data['rooms'])),
      first(),
    ).subscribe(subject => this._rooms$ = subject);
  }

  openRoom(roomId: string): void {
    this.router.navigate([roomId]);
  }

  openCreateRoomDialog(): void {
    const dialogRef = this.dialog.open(CreateRoomDialogComponent, {
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result)
        this.roomService.create(result).subscribe(res => {
          this._rooms$.value.push(res);
          this._rooms$.next(this._rooms$.value);
        });
    });
  }

  openJoinRoomDialog(): void {
    const dialogRef = this.dialog.open(JoinRoomDialogComponent, {
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result)
        this.roomService.join(result).subscribe(res => {
          this._rooms$.value.push(res);
          this._rooms$.next(this._rooms$.value);
        });
    });
  }
}
