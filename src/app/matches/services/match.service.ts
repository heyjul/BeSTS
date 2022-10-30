import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from 'src/app/shared/models/match.model';
import { environment } from 'src/environments/environment';
import { CreateMatch } from '../models/create-match.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  create(req: CreateMatch, roomId: string): Observable<Match> {
    return this.http.put<Match>(`${environment.apiUrl}/matches/${roomId}`, req);
  }
}
