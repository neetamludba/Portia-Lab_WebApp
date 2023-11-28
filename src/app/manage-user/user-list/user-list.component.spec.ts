import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { AccountService } from 'app/account/account.service';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let accountServiceMock: any;
  let userServiceMock: any;
  let mockSort: MatSort;
  let routerSpy: jasmine.SpyObj<Router>;


  beforeEach(async () => {
    accountServiceMock = {
      userValue: {
        userType: 'Admin', // Set the desired userType for testing
        companyID: -1 // Set the desired companyID for testing
        // Add other necessary properties based on your use case
      }
    };
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    userServiceMock = jasmine.createSpyObj('UserService');

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: AccountService, useValue: accountServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    mockSort = jasmine.createSpyObj('MatSort', ['sort']);
    component.sort = mockSort; // Assign the mock sort
    component.dataSource = new MatTableDataSource<any>([]);
    fixture.detectChanges();
  });

  it('should fetch all users for Super Admin with companyID -1', async () => {
    const mockUsers: any[] = []; // Create mock user data if needed

    spyOn(userServiceMock, 'getAllUsers').and.returnValue(Promise.resolve(mockUsers));
    component.ngAfterViewInit();
    await fixture.whenStable();

    expect(userServiceMock.getAllUsers).toHaveBeenCalled();
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.sort).toEqual(mockSort);
  });

  it('should fetch all users for Admin', async () => {
    const mockUsers: any[] = []; // Create mock user data if needed

    spyOn(userServiceMock, 'getAllUsersForAdmin').and.returnValue(Promise.resolve(mockUsers));
    component.ngAfterViewInit();
    await fixture.whenStable();

    expect(userServiceMock.getAllUsersForTeacher).toHaveBeenCalled();
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.sort).toEqual(mockSort);
  });

  it('should fetch all users for Teacher', async () => {
    const mockUsers: any[] = []; // Create mock user data if needed

    spyOn(userServiceMock, 'getAllUsersForTeacher').and.returnValue(Promise.resolve(mockUsers));
    component.ngAfterViewInit();
    await fixture.whenStable();

    expect(userServiceMock.getAllUsersForTeacher).toHaveBeenCalled();
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.dataSource.sort).toEqual(mockSort);
  });

  it('should navigate to user creation page', () => {
    component.createUser();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('user/create');
  });
});
