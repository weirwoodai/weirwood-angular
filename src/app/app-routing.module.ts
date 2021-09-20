import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DisclaimerComponent } from './pages/disclaimer/disclaimer.component';
import { FilingsComponent } from './pages/filings/filings.component';
import { HomeComponent } from './pages/home/home.component';
import { JarvisComponent } from './pages/jarvis/jarvis.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'disclaimer', component: DisclaimerComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  },
  { path: 'filings', component: FilingsComponent },
  { path: 'jarvis', component: JarvisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
