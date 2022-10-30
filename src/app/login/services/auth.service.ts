import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, shareReplay, tap } from 'rxjs/operators';
import { ConnectedUser } from "src/app/shared/models/connected-user.model";
import jwt_decode from 'jwt-decode';
import { DecodeTokenModel } from "src/app/shared/models/decodetoken.model";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Token } from "../models/token.model";
import { Login } from "../models/login.model";
import { Register } from "../models/register.model";

@Injectable()
export class AuthService {

    private REFRESH_TOKEN = 'refresh_token';
    private TOKEN = 'id_token';
    private EXPIRATION = 'expiration';

    private _isConnected$ = new BehaviorSubject<boolean>(this.isAuthenticated());
    get isConnected$(): Observable<boolean> {
        return this._isConnected$.asObservable();
    }

    private _connectedUser$ = new BehaviorSubject<ConnectedUser | undefined>(undefined);
    get connectedUser$(): Observable<ConnectedUser | undefined> {
        return this._connectedUser$.asObservable();
    }

    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
        setTimeout(() => this.setConnectedUser());
    }

    login(req: Login): Observable<Token> {
        return this.http.post<Token>(`${environment.apiUrl}/login`, req).pipe(
            tap(res => this.setSession(res)),
            shareReplay()
        );
    }

    register(req: Register): Observable<boolean> {
        return this.http.post(`${environment.apiUrl}/register`, req).pipe(
            map(_ => true),
            shareReplay()
        );
    }

    hasRefreshToken(): boolean {
        return !!localStorage.getItem(this.REFRESH_TOKEN) && !!localStorage.getItem(this.TOKEN);
    }

    refreshToken(): Observable<Token> {
        const refreshToken = localStorage.getItem(this.REFRESH_TOKEN);
        return this.http.post<Token>(`${environment.apiUrl}/refresh-token`, { refreshToken: refreshToken })
            .pipe(tap(token => this.setSession(token)));
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.TOKEN);
    }

    isTokenValid() {
        const token = localStorage.getItem(this.TOKEN);
        if (!token) {
            return false;
        }
        const expiration = localStorage.getItem(this.EXPIRATION);
        return this.checkToken(token, Number(expiration));
    }

    getToken(): string | null {
        const token = localStorage.getItem(this.TOKEN);
        return token;
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    logout() {
        localStorage.removeItem(this.TOKEN);
        localStorage.removeItem(this.EXPIRATION);
        localStorage.removeItem(this.REFRESH_TOKEN);
        this._isConnected$.next(false);
        this._connectedUser$.next(undefined);
        this.router.navigateByUrl('/login');
    }

    private checkToken(token: string, expiration: number): boolean {
        return !!token && new Date(expiration) > new Date();
    }

    private setSession(res: Token) {
        const decodedToken = jwt_decode(res.token) as DecodeTokenModel;
        localStorage.setItem(this.TOKEN, res.token);
        localStorage.setItem(this.EXPIRATION, decodedToken.exp.toString());
        localStorage.setItem(this.REFRESH_TOKEN, res.refreshToken);
        this._connectedUser$.next(({
            id: decodedToken.sub,
            username: decodedToken.username,
            email: decodedToken.email,
        }));
        this._isConnected$.next(true);
    }

    private setConnectedUser() {
        const token = this.getToken();
        if (!token) {
            return;
        }
        if (this.isTokenValid()) {
            const decodedToken = jwt_decode(token) as DecodeTokenModel;
            this._connectedUser$.next(({
                id: decodedToken.sub,
                username: decodedToken.username,
                email: decodedToken.email,
            }));
            return;
        }
        if (this.hasRefreshToken()) {
            this.refreshToken().subscribe({
                next: v => this.setSession(v),
                error: () => this.logout()
            });
        }
        else {
            this.logout();
        }
    }
}