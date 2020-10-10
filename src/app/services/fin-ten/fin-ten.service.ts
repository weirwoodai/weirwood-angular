import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinTenService {
  private readonly backend = environment.backend;
  constructor(private http: HttpClient) {}

  getRoot() {
    return this.http.get(`${this.backend}/api`);
  }

  getTickers() {
    return this.http.get(`${this.backend}/api/company/tickers`);
  }

  getTicker(ticker: string) {
    return this.http.get(`${this.backend}/api/company/ticker?ticker=${ticker}`);
  }
}
