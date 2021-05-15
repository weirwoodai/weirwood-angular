import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { PaymentComponent } from './components/payment/payment.component';
import { EmailLoginComponent } from './email-login/email-login.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [LoginPageComponent, EmailLoginComponent, PaymentComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.stripeKey)
  ]
})
export class UserModule {}
