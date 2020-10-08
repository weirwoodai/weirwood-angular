import { Component, EventEmitter, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-tickers-list',
  templateUrl: './tickers-list.component.html',
  styleUrls: ['./tickers-list.component.scss']
})
export class TickersListComponent {
  public allTickers: string[] = [];
  public filteredTickers: string[] = [];
  public paginatedTickers: string[] = [];
  public currentPage = 0;
  public pageSize = 10;

  public inputTicker = '';

  @Output() selectedTicker = new EventEmitter<string>();

  constructor() {}

  public setTickers(tickers: any[]) {
    this.allTickers = tickers;
    this.filteredTickers = tickers.slice();
    this.iterate();
  }

  public handlePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.iterate();
  }

  public keyUp() {
    this.filteredTickers = this.allTickers.filter((v) =>
      v.toLowerCase().includes(this.inputTicker.toLowerCase())
    );
    this.iterate();
  }

  public clear() {
    this.inputTicker = '';
    this.keyUp();
  }

  public emitTickerSelected(ticker: any) {
    this.selectedTicker.emit(ticker);
  }

  private iterate() {
    this.fixCurrentPage();
    const start = this.currentPage * this.pageSize;
    const end = (this.currentPage + 1) * this.pageSize;
    this.paginatedTickers = this.filteredTickers.slice(start, end);
  }

  private fixCurrentPage() {
    if (this.currentPage * this.pageSize > this.filteredTickers.length) {
      const r = Math.floor(this.filteredTickers.length / this.pageSize);
      this.currentPage = r;
    }
  }
}
