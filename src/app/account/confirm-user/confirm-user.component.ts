import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css'],
})
export class ConfirmUserComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) { }

  confirmUserForm = new FormGroup({
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
  confirmToken = '';

  ngOnInit() {
    if (this.route.queryParams) {
      this.route.queryParams.subscribe((params) => {
        this.confirmToken = params['token'];
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    this.accountService
      .resetPassword(
        this.confirmUserForm.get('newPassword')?.value,
        this.confirmToken
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
