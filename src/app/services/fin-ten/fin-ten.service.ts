import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentIntent } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentSessionService } from '../current-session/current-session.service';

@Injectable({
  providedIn: 'root'
})
export class FinTenService {
  private readonly backend = environment.backend;
  constructor(
    private http: HttpClient,
    private currentSession: CurrentSessionService
  ) {}

  getTickers() {
    try {
      return this.getWithAuthentication(`${this.backend}/company/tickers`);
    } catch (ex) {
      return this.getDemoData(`${this.backend}/company/demo/tickers`);
    }
  }

  getFilings(ticker: string) {
    try {
      return this.getWithAuthentication(
        `${this.backend}/company/filings?ticker=${ticker}`
      );
    } catch (ex) {
      return this.getDemoData(
        `${this.backend}/company/demo/filings?ticker=${ticker}`
      );
    }
  }

  private getWithAuthentication(url: string) {
    if (!this.currentSession.isAuthenticated()) {
      throw new Error('Unauthenticated user!');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.currentSession.getCurrentToken()}`
    });

    return this.http.get(url, { headers }).toPromise();
  }

  sendPaymentToken(token: any) {
    if (!this.currentSession.isAuthenticated()) {
      throw new Error('Unauthenticated user!');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${this.currentSession.getCurrentToken()}`
    });

    const body = new HttpParams().set('token', token);

    return this.http
      .post(`${this.backend}/payments/token`, body.toString(), {
        headers,
        observe: 'response'
      })
      .toPromise();
  }

  createPaymentIntent(amount: number): Observable<PaymentIntent> {
    if (!this.currentSession.isAuthenticated()) {
      throw new Error('Unauthenticated user!');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${this.currentSession.getCurrentToken()}`
    });

    const body = new HttpParams().set('amount', `${amount}`);

    return this.http.post<PaymentIntent>(
      `${this.backend}/payments/intent`,
      body.toString(),
      { headers }
    );
  }

  private getDemoData(url: string) {
    return this.http.get(url).toPromise();
  }
}
