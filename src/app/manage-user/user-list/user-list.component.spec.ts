import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { AccountService } from 'app/account/account.service';
import { User } from 'app/models/user.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let accountService: jasmine.SpyObj<AccountService>;

  const loginUser = {
    userID: 1,
    firstName: 'Super',
    lastName: 'Admin',
    email: 'sa@pl.com',
    registerationDate: new Date,
    companyID: -1,
    userType: 'Admin',
  };

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getAllUsers', 'getAllUsersForAdmin', 'getAllUsersForTeacher']);
    const accountServiceSpy = jasmine.createSpyObj('AccountService', ['userValue']);
    Object.defineProperty(accountServiceSpy, 'userValue', {
      get: () => loginUser // Replace loginUser with your desired value
    });
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        MatTableModule,
        MatSortModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AccountService, useValue: accountServiceSpy }
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    accountService = TestBed.inject(AccountService) as jasmine.SpyObj<AccountService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    // userService.getAllUsers.and.returnValue(Promise.resolve(mockUsers));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all users for Super Admin with companyID -1', async () => {
    const mockUsers: User[] = [
      {
        userID: 2,
        firstName: 'Admin',
        lastName: 'Admin',
        password: ' asdd',
        fullName: 'Admin Admin',
        email: 'aa@pl.com',
        registerationDate: new Date,
        companyID: 1,
        userType: 'Admin',
      }, {
        userID: 3,
        firstName: 'Teacher',
        lastName: 'Teacher',
        password: 'asd',
        fullName: 'Teacher Teacher',
        email: 'tt@pl.com',
        registerationDate: new Date,
        companyID: 1,
        userType: 'Teacher',
      },
      {
        userID: 4,
        firstName: 'S',
        lastName: 'S',
        password: 'sdf',
        fullName: 'S S',
        email: 'ss@pl.com',
        registerationDate: new Date,
        companyID: 1,
        userType: 'Student',
      }];
    const loginUser = {
      userID: 1,
      firstName: 'Super',
      lastName: 'Admin',
      email: 'sa@pl.com',
      registerationDate: new Date,
      companyID: -1,
      userType: 'Admin',
    };
    spyOnProperty(accountService, 'userValue', 'get').and.returnValue(loginUser);

    userService.getAllUsers.and.returnValue(Promise.resolve(mockUsers));
    component.ngAfterViewInit();
    await fixture.whenStable();

    expect(userService.getAllUsers).toHaveBeenCalled();
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.data).toEqual(mockUsers);
  });

  it('should fetch all users for Admin', async () => {
    const mockUsers: User[] = [{
      userID: 3,
      firstName: 'Teacher',
      lastName: 'Teacher',
      password: 'asd',
      fullName: 'Teacher Teacher',
      email: 'tt@pl.com',
      registerationDate: new Date,
      companyID: 1,
      userType: 'Teacher',
    },
    {
      userID: 4,
      firstName: 'S',
      lastName: 'S',
      password: 'sdf',
      fullName: 'S S',
      email: 'ss@pl.com',
      registerationDate: new Date,
      companyID: 1,
      userType: 'Student',
    }];

    const loginUser = {
      userID: 2,
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'aa@pl.com',
      registerationDate: new Date,
      companyID: 1,
      userType: 'Admin',
    };
    spyOnProperty(accountService, 'userValue', 'get').and.returnValue(loginUser);

    userService.getAllUsersForAdmin.and.returnValue(Promise.resolve(mockUsers));
    component.ngAfterViewInit();
    await fixture.whenStable();

    expect(userService.getAllUsersForAdmin).toHaveBeenCalled();
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.data).toEqual(mockUsers);
  });

  it('should fetch all users for Teacher', async () => {
    const mockUsers: User[] = [
      {
        userID: 4,
        firstName: 'S',
        lastName: 'S',
        password: 'sdf',
        fullName: 'S S',
        email: 'ss@pl.com',
        registerationDate: new Date,
        companyID: 1,
        userType: 'Student',
      },
      {
        userID: 5,
        firstName: 'St',
        lastName: 'St',
        password: 'sdf',
        fullName: 'St St',
        email: 'ss@pl.com',
        registerationDate: new Date,
        companyID: 1,
        userType: 'Student',
      }
    ];

    const loginUser = {
      userID: 3,
      firstName: 'Teacher',
      lastName: 'Teacher',
      email: 'tt@pl.com',
      registerationDate: new Date,
      companyID: 1,
      userType: 'Teacher',
    };
    spyOnProperty(accountService, 'userValue', 'get').and.returnValue(loginUser);

    userService.getAllUsersForTeacher.and.returnValue(Promise.resolve(mockUsers));
    component.ngAfterViewInit();
    await fixture.whenStable();

    expect(userService.getAllUsersForTeacher).toHaveBeenCalled();
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.data).toEqual(mockUsers);
  });

  it('should navigate to user creation page', () => {

    const routerSpy = spyOn((component as any).router, 'navigateByUrl').and.stub();
    component.createUser();
    expect(routerSpy).toHaveBeenCalledWith('user/create');
  });
});
