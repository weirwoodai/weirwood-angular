import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout/';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FilingListComponent } from 'src/app/components/filing-list/filing-list.component';
import { TickersListComponent } from 'src/app/components/tickers-list/tickers-list.component';
import { FinTenService } from 'src/app/services/fin-ten/fin-ten.service';

@Component({
  selector: 'app-filings',
  templateUrl: './filings.component.html',
  styleUrls: ['./filings.component.scss']
})
export class FilingsComponent implements OnInit {
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

  ngOnInit(): void {
    this.getTickers().then(() => {
      this.setSelectedTicker('AAPL');
    });
  }

  public async getTickers() {
    this.loading = true;
    try {
      const data: any = await this.finten.getTickers();
      this.loading = false;
      this.tickerSelection.setTickers(data.tickers);
    } catch (ex) {
      this.loading = false;
      this.unsuccessfulRequest = 'Connection failed!';
    }
  }

  public async getFilings(ticker: string) {
    this.loadingFilings = true;
    this.unsuccessfulRequest = null;
    this.filingsList.filings = [];

    console.log(`Getting financial info of ${ticker}`);
    try {
      const data: any = await this.finten.getFilings(ticker);
      console.log('Received: ', data);
      this.loadingFilings = false;
      this.filingsList.filings = data.filings;
    } catch (ex) {
      this.loadingFilings = false;
      this.unsuccessfulRequest =
        'Could not fetch the data. Please, try again later.';
      this.filingsList.filings = [];
      console.error('There was an error: ', ex);
    }
  }

  public setSelectedTicker(event: any) {
    this.selectedTicker = event;
    this.getFilings(this.selectedTicker);
  }
}
