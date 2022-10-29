import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import { catchError, Observable, tap, map, of } from 'rxjs';
import { AuthService } from 'src/app/login/services/auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        if (this.authService.isAuthenticated() && this.authService.isTokenValid()) {
            return true;
        }
        if(this.authService.hasRefreshToken()){
            return this.authService.refreshToken().pipe(
                map(() => true),
                catchError(() => {
                    this.router.navigate(['login']);
                    return of(false);
                })
            );
        }
        this.router.navigate(['login']);
        return false;        
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.canActivate(childRoute, state);
    }

}
