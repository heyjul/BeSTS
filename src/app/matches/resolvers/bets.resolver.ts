import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { BetService } from 'src/app/shared/services/bet.service';
import { FullBet } from '../models/full-bet.model';

@Injectable({
  providedIn: 'root'
})
export class BetsResolver implements Resolve<FullBet[]> {
  constructor(private betService: BetService) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<FullBet[]> {
    return this.betService.getByMatch(route.params["matchId"]);
  }
}
