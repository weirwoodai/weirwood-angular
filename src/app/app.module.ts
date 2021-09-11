import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilingListComponent } from './components/filing-list/filing-list.component';
import { TickersListComponent } from './components/tickers-list/tickers-list.component';
import { VideoBackgroundComponent } from './components/video-background/video-background.component';
import { WeirwoodProductComponent } from './components/weirwood-product/weirwood-product.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FilingsComponent } from './pages/filings/filings.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SharedModule } from './shared/shared.module';
import { JarvisComponent } from './pages/jarvis/jarvis.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilingListComponent,
    FilterPipe,
    TickersListComponent,
    ProductsComponent,
    AboutComponent,
    ContactComponent,
    VideoBackgroundComponent,
    WeirwoodProductComponent,
    FilingsComponent,
    JarvisComponent
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
