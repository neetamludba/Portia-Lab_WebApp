import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  resetPasswordForm = new FormGroup({
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  loading = false;
  submitted = false;
  resetToken = '';

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.resetToken = params['token'];
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    this.accountService
      .resetPassword(
        this.resetPasswordForm.get('newPassword')?.value,
        this.resetToken
      )
      .then(() => {
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        this.submitted = false;
        this.loading = false;
      });
  }
}
