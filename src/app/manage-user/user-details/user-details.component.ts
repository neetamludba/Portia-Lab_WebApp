import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { AccountService } from 'app/account/account.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) { }

  userDetailsForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),

    userType: new FormControl(''),

    active: new FormControl(true)
  });

  userId: number = 0;
  roles = [''];

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    let crntUser = this.accountService.userValue;
    if (crntUser && crntUser.userType) {
      if (crntUser.userType === 'Admin' && crntUser.companyID === -1) {
        this.roles = ['Admin', 'Teacher', 'Student', 'Guardian'];
      }
      else if (crntUser.userType === 'Admin') {
        this.roles = ['Teacher', 'Student', 'Guardian'];
      }
      else if (crntUser.userType === 'Teacher') {
        this.roles = ['Student', 'Guardian'];
      }
    }

    if (!isNaN(id) && id > 0) {
      this.userId = id;
      this.getUser(this.userId);
    }
  }




  showErrorMessage(fieldName: string) {
    let errors = this.userDetailsForm.get(fieldName)?.errors;

    if (errors) {
      //console.log({ fieldName }, { errors }, errors['required']);

      if (errors['required']) return fieldName + ' is required';
      if (errors['minlength']) return fieldName + ' must be 5 characters long';
      return '';
    } else return '';
  }

  changeRole(r: any) {
    this.userDetailsForm.setValue({ userType: r.target.value });
  }

  getUser(userId: number) {
    this.userService.getUser(userId).then((user) => {
      if (user) {
        this.userDetailsForm.setValue({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.strKey,
          userType: user.userType,
          active: user.active,
        });

        this.userDetailsForm.controls['email'].disable();
      }
      else {
        console.log('User Not Found')
        this.router.navigateByUrl('user').catch((error) => {
          console.log(error);
        });
      }
    }).catch((error) => {
      console.error('Error fetching user:', error);
      // Handle error scenario
    });
  }

  saveUser() {
    // console.log(this.userDetailsForm.errors);

    this.userService
      .saveUser(
        {
          email: this.userDetailsForm.get('email')?.value,
          firstName: this.userDetailsForm.get('firstName')?.value,
          lastName: this.userDetailsForm.get('lastName')?.value,
          password: this.userDetailsForm.get('password')?.value,
          strKey: this.userDetailsForm.get('password')?.value,
          userType: this.userDetailsForm.get('userType')?.value,
          active: Boolean(this.userDetailsForm.get('active')?.value),
        },
        this.userId
      )
      .then((userCreated) => {
        if (userCreated)
          this.router.navigateByUrl('user').catch((error) => {
            console.log(error);
          });
      })
      .catch((ex) => console.log(ex));
  }

  closeForm() {
    this.router.navigateByUrl('user').catch((error) => {
      console.log(error);
    });
  }
}
