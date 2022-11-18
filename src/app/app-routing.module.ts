import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './login/components/create-account/create-account.component';
import { LoginComponent } from './login/components/login/login.component';
import { CreateMatchComponent } from './matches/components/create-match/create-match.component';
import { CreateMatchResolver } from './matches/resolvers/create-match.resolver';
import { MatchesResolver } from './shared/resolvers/matches.resolver';
import { RoomsComponent } from './rooms/components/rooms/rooms.component';
import { SingleRoomComponent } from './rooms/components/single-room/single-room.component';
import { RoomsResolver } from './rooms/resolvers/rooms.resolver';
import { SingleRoomResolver } from './rooms/resolvers/single-room.resolver';
import { MatchResolver } from './matches/resolvers/match.resolver';
import { ScoresComponent } from './rooms/components/scores/scores.component';
import { ScoresResolver } from './rooms/resolvers/scores.resolver';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: CreateAccountComponent },
  { path: 'rooms', component: RoomsComponent, resolve: { rooms: RoomsResolver } },
  { path: 'rooms/:id', component: SingleRoomComponent, resolve: { room: SingleRoomResolver, matches: MatchesResolver } },
  { path: 'rooms/:id/scores', component: ScoresComponent, resolve: { scores: ScoresResolver } },
  { path: 'rooms/:roomId/match/:matchId', component: CreateMatchComponent, resolve: { teams: CreateMatchResolver, match: MatchResolver } },
  { path: 'rooms/:roomId/match', component: CreateMatchComponent, resolve: { teams: CreateMatchResolver } },
  { path: '**', redirectTo: 'rooms' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
