import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';
import { RoomService } from '../services/room.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsResolver implements Resolve<Room[]> {
  constructor(private roomService: RoomService) { }

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Room[]> {
    return this.roomService.get();
  }
}
