import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filing-list',
  templateUrl: './filing-list.component.html',
  styleUrls: ['./filing-list.component.scss']
})
export class FilingListComponent implements OnInit {
  private _filings: any[] = [];

  public displayedColumns: string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.displayFilings();
  }

  public get filings() {
    return this._filings;
  }

  public set filings(filings: any[]) {
    this._filings = filings.slice();
    this.displayFilings();
  }

  private displayFilings() {
    const props: Set<string> = new Set();
    for (const filing of this.filings) {
      Object.keys(filing).forEach((k) => props.add(k));
    }

    this.displayedColumns = [...props];
  }

  humanReadable(text: string) {
    const anyUpperCaseNotAtTheStart = /([^^])([A-Z])/g;
    return text.replace(anyUpperCaseNotAtTheStart, '$1 $2');
  }
}
