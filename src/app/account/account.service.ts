import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { SaveService } from 'app/globals/api';
import { SessionUser } from 'app/models/session.user.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<SessionUser>;

  constructor(private router: Router) {
    const userObject = localStorage.getItem('user');

    this.userSubject = new BehaviorSubject<SessionUser>(
      userObject ? JSON.parse(userObject) : null
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): SessionUser {
    return this.userSubject.value?.userObject;
  }

  public get token(): string {
    return this.userSubject.value.token.accessToken;
  }

  async login(email: string, password: string) {
    return SaveService('auth/login', {
      email: email,
      password: password,
    }).then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    });
  }

  async forgetPassword(email: string) {
    return SaveService('auth/forgetpassword', {
      email: email,
    });
  }

  async resetPassword(newPassword: string, token: string) {
    return SaveService('auth/resetpassword', {
      token: token,
      password: newPassword,
    }).then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    });
  }

  async logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('account/login');
  }
}
