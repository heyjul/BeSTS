import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './login/components/create-account/create-account.component';
import { LoginComponent } from './login/components/login/login.component';
import { RoomsComponent } from './rooms/components/rooms/rooms.component';
import { RoomsResolver } from './rooms/resolvers/rooms.resolver';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: '', component: RoomsComponent, resolve: { rooms: RoomsResolver } },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
