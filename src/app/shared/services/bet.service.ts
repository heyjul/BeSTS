import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bet } from '../models/bet.model';
import { CreateBet } from '../models/create-bet.model';

@Injectable({
  providedIn: 'root'
})
export class BetService {

  constructor(private http: HttpClient) { }

  createOrUpdate(req: CreateBet, matchId: string): Observable<Bet> {
    return this.http.put<Bet>(`${environment.apiUrl}/bets/${matchId}`, req);
  }
}
