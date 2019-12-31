import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export interface AuthReponseData {
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

  constructor(private httpClient: HttpClient) {
  }

  signup(email: string, password: string): Observable<AuthReponseData> {
    return this.httpClient.post<AuthReponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.fbKey}`,
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(catchError(errorResponse => {
        return this.handleError(errorResponse);
      }));
  }

  login(email: string, password: string) {
    return this.httpClient.post<AuthReponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.fbKey}`,
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(catchError(errorResponse => {
        return this.handleError(errorResponse);
      }));
  }

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
