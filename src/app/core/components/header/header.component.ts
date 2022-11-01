import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AskUpdateService } from 'src/app/ask-update.service';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isConnected$!: Observable<boolean>;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.isConnected$ = this.authService.isConnected$;
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  logout(): void {
    this.authService.logout();
  }
}
