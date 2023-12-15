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

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should have getUser function', () => {
    expect(userService.getUser).toBeTruthy();
  }
  );

  it('should have getAllUsers function', () => {
    expect(userService.getAllUsers).toBeTruthy();
  }
  );

  it('should have saveUser function', () => {
    expect(userService.saveUser).toBeTruthy();
  }
  );

  it('should have getAllActiveUsers function', () => {
    expect(userService.getAllActiveUsers).toBeTruthy();
  }
  );

  it('should have getAllUsersForAdmin function', () => {
    expect(userService.getAllUsersForAdmin).toBeTruthy();
  }
  );

});
