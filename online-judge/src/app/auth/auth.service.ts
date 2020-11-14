import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from '../model/user.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  error: string;

  userUrl: string;
  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080';
  }

  private token: string = localStorage.getItem('token');
  // tslint:disable-next-line:typedef
  isAuthenticated() {
    return localStorage.getItem('token') === 'loggedin';
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.toggleToken();
    localStorage.clear();
    localStorage.setItem('token', this.getToken());
  }

  login(form): Observable<User> {
    return this.http.post<User>(this.userUrl + '/login', form).pipe(
       catchError(this.handleLoginError)
    );
  }

  register(form): Observable<User> {
    return this.http.post<User>(this.userUrl + '/register', form).pipe(
      catchError(this.handleRegisterError)
    );
  }

  // tslint:disable-next-line:typedef
  toggleToken() {
    this.token = (this.token === 'loggedin') ? 'loggedout' : 'loggedin';
  }
  // tslint:disable-next-line:typedef
  getToken() {
    return this.token;
  }

  // tslint:disable-next-line:typedef
  handleRegisterError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      this.error = 'email error';
      errorMessage = `Email already exist`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // tslint:disable-next-line:typedef
  handleLoginError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      this.error = 'no user';
      errorMessage = `You have not registered yet`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  // tslint:disable-next-line:typedef
  public getError() {
    return this.error;
  }
}
