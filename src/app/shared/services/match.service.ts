import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from 'src/app/shared/models/match.model';
import { environment } from 'src/environments/environment';
import { CreateOrUpdateMatch } from '../../matches/models/create-match.model';
import { CloseMatchRequest } from '../models/close-match-request.model';
import { FullMatch } from '../models/full-match.model';
import { MatchResult } from '../models/match-result.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  createOrUpdate(req: CreateOrUpdateMatch, roomId: string): Observable<Match> {
    return this.http.put<Match>(`${environment.apiUrl}/matches/${roomId}`, req);
  }

  get(roomId: string): Observable<FullMatch[]> {
    return this.http.get<FullMatch[]>(`${environment.apiUrl}/matches/${roomId}`);
  }

  delete(matchId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/matches/${matchId}`);
  }

  getById(matchId: string): Observable<FullMatch> {
    return this.http.get<FullMatch>(`${environment.apiUrl}/matches/match/${matchId}`);
  }

  close(matchId: string, req: CloseMatchRequest): Observable<MatchResult> {
    return this.http.post<MatchResult>(`${environment.apiUrl}/matches/${matchId}/close`, req);
  }
}
