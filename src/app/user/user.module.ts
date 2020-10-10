import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailLoginComponent } from './email-login/email-login.component';

@NgModule({
  declarations: [LoginPageComponent, EmailLoginComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule, ReactiveFormsModule]
})
export class UserModule {}
