import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { TickersComponent } from './pages/tickers/tickers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'products', component: ProductsComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'contact', component: ContactComponent }
  { path: 'tickers', component: TickersComponent },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
