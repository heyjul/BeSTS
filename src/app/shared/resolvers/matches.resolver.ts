import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FullMatch } from '../models/full-match.model';
import { MatchService } from '../services/match.service';

@Injectable({
  providedIn: 'root'
})
export class MatchesResolver implements Resolve<FullMatch[]> {
  constructor(private matchService: MatchService) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<FullMatch[]> {
    return this.matchService.get(route.params['id']);
  }
}
