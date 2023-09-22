import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  forgetPasswordForm = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.email,
    ]),
  });

  loading = false;
  submitted = false;

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    this.accountService
      .forgetPassword(this.forgetPasswordForm.get('username')?.value)
      .then(() => {
        this.router.navigateByUrl('/account/forgetpasswordcheckemail');
      })
      .catch((err) => {
        this.submitted = false;
        this.loading = false;
      });
  }
}
