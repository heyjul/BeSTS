import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';
import { FullRoom } from '../../models/full-room.model';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrls: ['./single-room.component.scss']
})
export class SingleRoomComponent implements OnInit {

  private _room$!: BehaviorSubject<FullRoom>;
  get room$() {
    return this._room$.asObservable();
  }

  isOwner$!: Observable<boolean>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.route.data.pipe(
      first(),
      map(data => new BehaviorSubject(data['room'])),
    ).subscribe(subject => this._room$ = subject);

    this.isOwner$ = this.auth.connectedUser$.pipe(
      map(user => user?.id === this._room$.value.ownerId)
    );
  }

  createMatch(): void {
    this.router.navigateByUrl(`create-match/${this._room$.value.id}`);
  }
}
