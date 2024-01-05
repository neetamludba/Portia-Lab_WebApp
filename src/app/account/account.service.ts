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
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    });
  }

  async resetPasswordByUser(oldPassword: string, newPassword: string) {
    return SaveService('auth/resetpasswordbyuser', {
      userID: this.userValue.userID,
      oldPassword: oldPassword,
      newPassword: newPassword,
    }).then((user) => {
      if (user.userObject) {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }
      return user.areEqual
    });
  }

  async logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('account/login');
  }
}
