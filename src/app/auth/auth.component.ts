import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthReponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoggedInMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoggedInMode = !this.isLoggedInMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    let auth$: Observable<AuthReponseData>;
    this.isLoading = true;
    if (this.isLoggedInMode) {
      auth$ = this.authService.login(email, password);
    } else {
      auth$ = this.authService.signup(email, password);
    }

    auth$.subscribe(response => {
        console.log(response);
        this.isLoading = false;
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
        console.log(errorMessage);
      });

    authForm.reset();
  }
}

// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
// https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
