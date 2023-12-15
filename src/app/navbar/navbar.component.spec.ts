import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AccountService } from '../account/account.service';

import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
      ],
      declarations: [NavbarComponent],
      providers: [
        AccountService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set username when user is available in localStorage', () => {
    const user = { userObject: { firstName: 'John', lastName: 'Doe' } };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));
    component.getUserName();

    expect(component.userName).toBe('John Doe');
  });

  it('should not set username when user is not available in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.getUserName();

    expect(component.userName).toBe('');
  });

  it('should navigate to reset password page', () => {
    spyOn((component as any).router, 'navigateByUrl');
    component.resetPassword();

    expect((component as any).router.navigateByUrl).toHaveBeenCalledWith('/reset-password');
  });

  it('should call accountService logout method', () => {
    spyOn((component as any).accountService, 'logout');
    component.logout();

    expect((component as any).accountService.logout).toHaveBeenCalled();
  });

});

