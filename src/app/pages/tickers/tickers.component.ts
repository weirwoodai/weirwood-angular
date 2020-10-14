import { Component, ViewChild } from '@angular/core';
import { FilingListComponent } from 'src/app/components/filing-list/filing-list.component';
import { TickersListComponent } from 'src/app/components/tickers-list/tickers-list.component';
import { FinTenService } from 'src/app/services/fin-ten/fin-ten.service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout/';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-tickers',
  templateUrl: './tickers.component.html',
  styleUrls: ['./tickers.component.scss']
})
export class TickersComponent {
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  public loading = false;
  public selectedTicker = '';

  public loadingFilings = false;
  public unsuccessfulRequest: any = null;

  @ViewChild(TickersListComponent)
  tickerSelection: TickersListComponent;
  @ViewChild(FilingListComponent) filingsList: FilingListComponent;

  constructor(
    private finten: FinTenService,
    private breakpointObserver: BreakpointObserver
  ) {}

  public getTickers() {
    this.loading = true;
    try {
      this.finten.getTickers().subscribe(
        (data: any) => {
          this.loading = false;
          this.tickerSelection.setTickers(data.tickers);
        },
        (error: any) => {
          this.loading = false;
          this.unsuccessfulRequest = error.error;
        }
      );
    } catch (ex) {
      this.loading = false;
      this.unsuccessfulRequest = ex.toString();
    }
  }

  public getFilings(ticker: string) {
    this.loadingFilings = true;
    this.unsuccessfulRequest = null;
    this.filingsList.filings = [];

    console.log(`Getting financial info of ${ticker}`);
    this.finten.getTicker(ticker).subscribe(
      (data: any) => {
        console.log('Received: ', data);
        this.loadingFilings = false;
        this.filingsList.filings = data.data;
      },
      (error: any) => {
        this.loadingFilings = false;
        this.unsuccessfulRequest = error.error.error;
        this.filingsList.filings = [];
        console.log('There was an error! This one: ', error.error.error);
      }
    );
  }

  public setSelectedTicker(event: any) {
    this.selectedTicker = event;
    this.getFilings(this.selectedTicker);
  }
}
