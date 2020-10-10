import { Component, OnInit } from '@angular/core';
import { FinTenService } from 'src/app/services/fin-ten/fin-ten.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public testResult = '';
  constructor(private finten: FinTenService) {}

  ngOnInit(): void {}

  testAPI() {
    this.testResult = 'Loading...';
    this.finten.getRoot().subscribe((data: any) => {
      this.testResult = data.message;
    });
  }
}
