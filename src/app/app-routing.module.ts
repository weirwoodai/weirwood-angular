import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TickersComponent } from './pages/tickers/tickers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
