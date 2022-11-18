import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Score } from '../models/score.model';
import { RoomService } from '../services/room.service';

@Injectable({
  providedIn: 'root'
})
export class ScoresResolver implements Resolve<Score[]> {
  constructor(private roomService: RoomService) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Score[]> {
    return this.roomService.getScores(route.params["id"]);
  }
}
