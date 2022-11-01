import { Component } from '@angular/core';
import { AppUpdateService } from './app-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private update: AppUpdateService) { }
}
