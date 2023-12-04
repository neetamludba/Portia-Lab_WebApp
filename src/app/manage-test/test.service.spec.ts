import { TestBed } from '@angular/core/testing';

import { TestService } from './test.service';

describe('TestService', () => {
  let service: TestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestService],
    });
    service = TestBed.inject(TestService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getTest function', () => {
    expect(service.getTest).toBeTruthy();
  }
  );

  it('should have getAllTests function', () => {
    expect(service.getAllTests).toBeTruthy();
  }
  );

  it('should have saveTest function', () => {
    expect(service.saveTest).toBeTruthy();
  }
  );

});
