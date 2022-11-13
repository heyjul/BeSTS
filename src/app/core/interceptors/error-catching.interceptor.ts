import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar,) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.snackBar.open(error.error, 'X', {
            duration: 5000,
            panelClass: ['toast']
          });

          return throwError(() => error);
        })
      );
  }
}
