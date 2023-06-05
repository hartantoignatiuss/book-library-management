import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";


export interface AuthRequestData {
    email: string,
    password: string,
    returnSecureToken: boolean
}

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registered?: string
}


@Injectable({ providedIn: 'root' })
export class AuthService {
    userSubject = new BehaviorSubject<User>(null!);
    private tokenExpirationTimer: any;
    url: string = 'https://identitytoolkit.googleapis.com/v1/accounts';
    authKey: string = 'AIzaSyBbnO0AKhQIqlUEIHThXRcx72VGsUjBIb0';
    authData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
    }


    constructor(private httpClient: HttpClient, private router: Router) {


    }

    createAuth(authRequestData: AuthRequestData) {
        const createAuthUrl: string = this.url + ':signUp?key=' + this.authKey;
        return this.httpClient.post<AuthResponseData>
            (createAuthUrl, authRequestData)
            .pipe(
                map(response => {

                })
            );
    }

    checkAuthIsAvalaibleOrExpired() {
        this.authData = JSON.parse(localStorage.getItem('userData') || '{}');
        const currentTime = new Date();
        const expiredTime = new Date(this.authData._tokenExpirationDate);

        if (expiredTime < currentTime) {
            console.log('a');
            this.logout();
            return false;
        }
        else {
            return true;
        }
    }

    getAuthToken() {
        if (this.authData === undefined) {
            return this.authData;
        }
        else {
            return this.authData._token;
        }
    }

    login(authRequestData: AuthRequestData) {
        const loginAuthUrl: string = this.url + ':signInWithPassword?key=' + this.authKey;
        return this.httpClient.post<AuthResponseData>
            (loginAuthUrl, authRequestData).
            pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email, resData.localId
                        , resData.idToken, +resData.expiresIn)

                })
            );
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData') || '{}');

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id
            , userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            // this.userSubject.next(loadedUser);

            const experationDuration = new Date(userData._tokenExpirationDate).getTime()
                - new Date().getTime();
            this.autoLogout(experationDuration)
        }

    }

    logout() {
        this.userSubject.next(null!);
        this.router.navigate(["login"]);
        localStorage.removeItem('userData')
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer =
            setTimeout(() => {
                this.logout();
            }, expirationDuration);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMsg = 'An unknown error occured!'
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMsg);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMsg = 'This email exists already';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMsg = 'Password sign-in is disabled for this project';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMsg = 'We have blocked all requests from this device due to unusual activity. Try again later';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMsg = 'You have entered an invalid username or password';
                break;
            case 'INVALID_PASSWORD':
                errorMsg = 'You have entered an invalid username or password';
                break;
            case 'USER_DISABLED':
                errorMsg = 'Your account has been disabled by an administrator';
                break;
            default:
                break;
        }
        return throwError(errorMsg);
    }

    private handleAuthentication(email: string, localId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        console.log('expired', expirationDate);
        const user = new User(email, localId, token, expirationDate);
        this.userSubject.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

}
