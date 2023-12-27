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
  ) { }

  resetPasswordForm = new FormGroup({
    oldPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  path: any = '';
  loading = false;
  submitted = false;
  // resetToken = '';

  ngOnInit() {
    if (this.route.snapshot.url.length >= 2) {
      this.path = this.route.snapshot.url[1].path;
    }
    // this.route.queryParams.subscribe((params) => {
    //   this.resetToken = params['token'];
    // });
  }
  matchNewAndConfirmPassword() {
    if (
      this.resetPasswordForm.get('newPassword')?.value !==
      this.resetPasswordForm.get('confirmPassword')?.value
    ) {
      return true;
    } else {
      return false;
    }

  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    this.accountService
      .resetPasswordByUser(
        this.resetPasswordForm.get('oldPassword')?.value!,
        this.resetPasswordForm.get('newPassword')?.value,
        // this.resetToken
      )
      .then((data) => {
        if (data) {
          this.loading = false;
          this.submitted = false;
          this.router.navigateByUrl('/');
        } else {
          this.loading = false;
          this.submitted = false;
          this.router.navigateByUrl('failed-reset-password');
        }
        // this.router.navigateByUrl('/');

      })
      .catch((err) => {
        this.submitted = false;
        this.loading = false;
      });
  }
}
