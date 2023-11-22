import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { GetService, SaveService } from 'app/globals/api';
import { AppConst } from 'app/globals/constants';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('UserServiceService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  const mockUser1 = {
    userID: 1,
    firstName: 'James',
    lastName: 'Dan',
    email: 'james@example.com',
    password: 'setPassword',
    registerationDate: new Date('2023-01-15'),
    companyID: 1,
    userType: 'Admin',
  };

  const mockUser2 = {
    userID: 2,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'securePassword',
    registerationDate: new Date('2023-01-15'),
    companyID: 1,
    userType: 'Teacher',
  };

  const mockUser3 = {
    userID: 3,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'strongPassword',
    registerationDate: new Date('2023-03-20'),
    companyID: 1,
    userType: 'Student',
  };

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should fetch all users', async () => {
    const mockUsers = [mockUser1, mockUser2, mockUser3];

    userService.getAllUsers().then((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne('your_api_endpoint_for_all_users');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  });

  it('should fetch all users for admin', async () => {
    const mockUsers = [mockUser2, mockUser3];

    userService.getAllUsersForAdmin(1).then((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne('your_api_endpoint_for_all_users');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  });

  it('should fetch all users for teacher', async () => {
    const mockUsers = [mockUser3];

    userService.getAllUsersForTeacher(1).then((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne('your_api_endpoint_for_all_users');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers);
  });

});
