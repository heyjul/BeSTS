import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from 'src/app/shared/models/team.model';
import { TeamService } from 'src/app/shared/services/team.service';

@Injectable({
  providedIn: 'root'
})
export class CreateMatchResolver implements Resolve<Team[]> {
  constructor(private teamService: TeamService) { }

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<Team[]> {
    return this.teamService.get();
  }
}
