import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { FullMatch } from 'src/app/shared/models/full-match.model';
import { MatchService } from 'src/app/shared/services/match.service';

@Injectable({
    providedIn: 'root'
})
export class MatchResolver implements Resolve<FullMatch> {
    constructor(private matchService: MatchService) { }

    resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<FullMatch> {
        console.log('match resolver');
        return this.matchService.getById(route.params["matchId"]);
    }
}
