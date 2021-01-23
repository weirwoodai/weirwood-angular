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
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { VideoBackgroundComponent } from './components/video-background/video-background.component';
import { WeirwoodProductComponent } from './components/weirwood-product/weirwood-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TickersComponent,
    FilingListComponent,
    FilterPipe,
    TickersListComponent,
    ProductsComponent,
    AboutComponent,
    ContactComponent,
    VideoBackgroundComponent,
    WeirwoodProductComponent
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
