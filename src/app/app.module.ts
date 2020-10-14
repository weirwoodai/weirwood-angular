import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { TickersComponent } from './pages/tickers/tickers.component';
import { FilingListComponent } from './components/filing-list/filing-list.component';
import { FilterPipe } from './pipes/filter.pipe';
import { TickersListComponent } from './components/tickers-list/tickers-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TickersComponent,
    FilingListComponent,
    FilterPipe,
    TickersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}