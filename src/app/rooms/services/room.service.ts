import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateRoom } from '../models/create-room.model';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  get(): Observable<Room[]> {
    return this.http.get<Room[]>(`${environment.apiUrl}/rooms`);
  }

  create(req: CreateRoom): Observable<Room> {
    return this.http.post<Room>(`${environment.apiUrl}/rooms`, req);
  }

  join(link: string): Observable<Room> {
    return this.http.post<Room>(`${environment.apiUrl}/rooms/join/${link}`, null);
  }
}
