import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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

  private getDemoData(url: string) {
    return this.http.get(url).toPromise();
  }
}
