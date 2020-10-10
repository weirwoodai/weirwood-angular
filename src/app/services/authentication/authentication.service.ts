import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/classes/login/login';
import { Session } from 'src/app/classes/session/session';
import { SignUp } from 'src/app/classes/signup/sign-up';
import { User } from 'src/app/classes/user/user';
import { FinTenLogin } from 'src/app/interfaces/fin-ten-login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = `${environment.backend}/api/users/login`;
  private signupUrl = `${environment.backend}/api/users/signup`;
  constructor(private http: HttpClient) {}

  public async signup(signup: SignUp): Promise<Session> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('username', signup.username)
      .set('email', signup.email)
      .set('password', signup.password);

    const response: FinTenLogin = (
      await this.http
        .post(this.signupUrl, body.toString(), {
          headers,
          observe: 'response'
        })
        .toPromise()
    ).body as FinTenLogin;

    return this.asSession(response);
  }

  public async login(login: Login): Promise<Session> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('username', login.username)
      .set('password', login.password);

    const response: FinTenLogin = (
      await this.http
        .post(this.loginUrl, body.toString(), {
          headers,
          observe: 'response'
        })
        .toPromise()
    ).body as FinTenLogin;

    return this.asSession(response);
  }

  private asSession(r: FinTenLogin): Session {
    return new Session(r.token, new User(r));
  }
}
