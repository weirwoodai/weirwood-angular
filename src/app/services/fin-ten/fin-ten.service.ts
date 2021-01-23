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

  getRoot() {
    return this.http.get(`${this.backend}/`);
  }

  getTickers() {
    return this.getWithAuthentication(`${this.backend}/company/tickers`);
  }

  getFilings(ticker: string) {
    return this.getWithAuthentication(
      `${this.backend}/company/filings?ticker=${ticker}`
    );
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
}
