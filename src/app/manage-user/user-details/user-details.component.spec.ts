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
    const event = {
      target: {
        value: 'Teacher'
      }
    };

    // Call the changeRole method with the created event object
    component.changeRole(event as any);

    expect(component.userDetailsForm.value).toEqual({
      userType: 'Teacher', // Assert against userType, not 'r'
      email: '', // Add other fields with their expected values if needed
      firstName: '',
      lastName: '',
      password: '',
      active: true
    });
  });

  it('should save User', async () => {
    // Mocking userService.saveUser method
    const mockUser = {
      email: 'test@example.com',
      firstName: 'asad',
      lastName: 'omar',
      password: 'omarlab',
      strKey: 'omarlab',
      userType: 'Student',
      active: 1,
    };
    userServiceMock.saveUser.and.returnValue(Promise.resolve(mockUser));

    // Set form values before calling saveUser
    component.userDetailsForm.patchValue({
      email: 'test@example.com',
      firstName: 'asad',
      lastName: 'omar',
      password: 'omarlab',
      strKey: 'omarlab',
      userType: 'Student',
      active: 1,
    });

    // Fixture setup
    fixture.detectChanges();
    await fixture.whenStable();

    // Trigger saveUser method
    component.saveUser();

    // Assertion
    await expect(userServiceMock.saveUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      firstName: 'asad',
      lastName: 'omar',
      password: 'omarlab',
      strKey: 'omarlab',
      userType: 'Student',
      active: 1,
    }, 1);

    // Expect router navigation upon successful save
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('user');
  });

  it('should clese form', async () => {

    fixture.detectChanges();
    await fixture.whenStable();

    component.closeForm();

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('user')
  });

});
