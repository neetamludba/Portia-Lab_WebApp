import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, shareReplay } from 'rxjs/operators';

import { AccountService } from 'app/account/account.service';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { SessionUser } from 'app/models/session.user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.user = this.accountService.userValue;

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  currentPageTitle: string = '';

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let rt = this.getChild(this.activatedRoute);

        rt.data.subscribe((data) => {
          this.currentPageTitle = data['title'] ?? 'Page Title';
        });
      });
    this.getUserName();

  }
  userName: string = '';


  user: SessionUser;



  isSuperAdmin(): boolean {
    if (!this.user) {
      return false;
    }
    return this.user.companyID === -1 && this.user.userType === 'Admin';
  };

  isAdmin(): boolean {
    if (!this.user) {
      return false;
    }
    return this.user.userType === 'Admin';
  };

  isTeacher(): boolean {
    if (!this.user) {
      return false;
    }
    return this.user.userType === 'Teacher';
  };

  getUserName() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userObject = JSON.parse(userString);
      if (userObject) {
        this.userName = userObject.userObject.firstName + ' ' + userObject.userObject.lastName;
      } else {
      }
    } else {
    }
  }



  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  getTitle() {
    return this.currentPageTitle;
  }

  resetPassword() {
    this.router.navigateByUrl('/reset-password');
  }

  logout() {
    this.accountService.logout();
  }
}
