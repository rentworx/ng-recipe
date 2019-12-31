import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fbKey = 'AIzaSyD_QfT7tCMI2cfGOY3Kosc0cuYojMqv1aE'; // firebase key
  user = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) {
  }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.fbKey}`,
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }));
  }

  login(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.fbKey}`,
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  // this method signature matches the expected signature for the catchError operator
  private handleError(errorResponse: HttpErrorResponse) {
    let error = 'An unknown error occurred';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(error);
    }
    switch (errorResponse.error.error.message) {
      case 'INVALID_PASSWORD':
        error = 'Invalid password';
        break;
      case 'EMAIL_NOT_FOUND':
        error = 'Email does not exist';
        break;
      case 'EMAIL_EXISTS':
        error = 'This email already exists';
    }
    return throwError(error);
  }
}

// Google firebase rest api
// or firebase rest api auth
// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
// https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
