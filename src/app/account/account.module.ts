import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ForgetPasswordCheckemailComponent } from './forget-password-checkemail/forget-password-checkemail.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';

@NgModule({
  declarations: [LoginComponent, ForgetPasswordComponent, ForgetPasswordCheckemailComponent, ResetPasswordComponent, ConfirmUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AccountModule {}
