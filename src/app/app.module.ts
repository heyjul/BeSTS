import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { RoomsModule } from './rooms/rooms.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatchesModule } from './matches/matches.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppUpdateService } from './app-update.service';
import { AppInstallService } from './app-install.service';

const initializer = (appInstallService: AppInstallService) => () => appInstallService.initPwaPrompt();

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    LoginModule.forRoot(),
    RoomsModule,
    MatNativeDateModule,
    MatchesModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    AppUpdateService,
    { provide: APP_INITIALIZER, useFactory: initializer, deps: [AppInstallService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
