import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatOptionModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatSelectModule } from '@angular/material/select';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;
  let userDetailsForm: FormGroup; // Initialize the form group for test details


  beforeEach(async () => {
    // Step: Create a form group for test details with a form control and validation
    userDetailsForm = new FormGroup({
      fieldName: new FormControl('', Validators.minLength(5))
    });

    userServiceMock = jasmine.createSpyObj('UserService', ['getUser', 'saveUser']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);
    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: (param: string) => '1' // Set the desired user ID for testing
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [
        RouterTestingModule,
        MatOptionModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an empty string when the field length is equal to 5', () => {
    // Arrange
    userDetailsForm.get('fieldName')?.setValue('valid');

    // Act
    const errorMessage = component.showErrorMessage('fieldName');

    // Assert
    expect(errorMessage).toBe('');
  });

  it('should return an empty string when there are no errors', () => {
    // Arrange
    userDetailsForm.get('fieldName')?.setValue('valid description');

    // Act
    const errorMessage = component.showErrorMessage('fieldName');

    // Assert
    expect(errorMessage).toBe('');
  });

  it('should change role', () => {
    const e = {
      target: {
        value: 'Teacher',
      },
    };
    component.changeRole(e);

    expect(component.userDetailsForm.value).toEqual({
      r: 'Teacher',
    });
  });

  it('should log the error when an error occurs during saving', async () => {
    // Arrange
    const testError = new Error('Test error');
    spyOn(console, 'log');
    spyOn(userServiceMock, 'saveUser').and.throwError(testError);

    // Act
    await component.saveUser();

    // Assert
    expect(console.log).toHaveBeenCalledWith(testError);
  });

  it('should handle undefined error when saving', async () => {
    // Arrange
    spyOn(console, 'log');
    spyOn(userServiceMock, 'saveUser').and.returnValue(Promise.reject(undefined));

    // Act
    await component.saveUser();

    // Assert
    expect(console.log).toHaveBeenCalledWith(undefined);
  });

  it('should save User', async () => {
    spyOn(userServiceMock, 'saveUser').and.stub();
    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
    navigateByUrlSpy.and.stub();
    fixture.detectChanges();
    await fixture.whenStable();
    component.saveUser();

    await expect(userServiceMock.saveUser).toHaveBeenCalledWith( {
      email: 'test@example.com',
      firstName: 'asad',
      lastName: 'omar',
      password: undefined,
      strKey: 'omarlab',
      userType: 'Student',
      active: 1,
    },
    0);

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/user')
  });

  it('should clese form', async () => {
    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
    navigateByUrlSpy.and.stub();

    fixture.detectChanges();
    await fixture.whenStable();

    component.closeForm();

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/user')
  });

});
