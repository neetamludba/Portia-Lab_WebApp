import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AccountService } from 'app/account/account.service';
import { User } from 'app/models/user.model';
import { SessionUser } from 'app/models/session.user.model';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css'],
})
export class MainNavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  user: SessionUser;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private accountService: AccountService
  ) {
    this.user = this.accountService.userValue;
  }

  isSuperAdmin = () => {
    return this.user && this.user.companyID === -1;
  };

  isAdmin = () => {
    return this.user && this.user.userType === 'Admin';
  };

  isTeacher = () => {
    return this.user && this.user.userType === 'Teacher';
  };
}
