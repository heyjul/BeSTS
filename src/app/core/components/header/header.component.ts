import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isConnected$!: Observable<boolean>;

  constructor(private authService: AuthService,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.isConnected$ = this.authService.isConnected$;
  }

  previous(): void {
    this.location.back();
  }

  next(): void {
    this.location.forward();
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  logout(): void {
    this.authService.logout();
  }
}
