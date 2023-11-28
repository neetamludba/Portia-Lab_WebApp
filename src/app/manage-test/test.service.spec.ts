import { TestBed } from '@angular/core/testing';

import { TestService } from './test.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('TestService', () => {
  let service: TestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TestService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getTest function', () => {
    expect(service.getTest).toBeTruthy();
  }
  );

  it('should have saveTest function', () => {
    expect(service.saveTest).toBeTruthy();
  }
  );


  it('should return the get test data', async () => {
    // Arrange
    const testID = 1;
    const expectedData = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };

    // Act
    const promise = service.getTest(testID);

    // Assert
    const testData = await promise;
    expect(testData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  it('should return the get all test data', async () => {
    // Arrange
    const expectedData = [{ id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false }, { id: 2, description: 'Test 2', categoryID: 2, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false }]


    // Act
    const promise = service.getAllTests();

    // Assert
    const testData = await promise;
    expect(testData).toEqual(expectedData);

    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });


  it('should create a new test if test.id is 0', async () => {
    // Arrange
    const testID = 0;
    const test = { description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false, questions: [] };
    const testDataSave = { id: 1, description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };

    // Act
    const promise = service.saveTest(test, testID);

    // Assert
    const testData = await promise;
    expect(testData).toEqual(testDataSave)


    // Ensure there are no outstanding requests
    httpTestingController.verify();
  });

  it('should update an existing test if test.id is not 0', async () => {
    // Arrange
    const test = { description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false, questions: [] };
    const testID = 1;
    // Act
    const promise = service.saveTest(test, testID);

    // Assert
    const testData = await promise;
    expect(testData).toEqual(test)

    httpTestingController.verify();

  });

  it('should create new questions associated with the test', async () => {
    // Arrange
    const testID = 0;
    const test = { description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };
    const question = { id: 0, testID: 0, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };
    const questionArray = { id: 1, testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };

    // Act
    (service as any).httpPostQuestion = jasmine.createSpy().and.returnValue(Promise.resolve({}));
    const promise = service.saveTest({ ...test, questions: [question] }, testID);

    // Assert
    await promise;

    expect((service as any).httpPostQuestion).toHaveBeenCalledWith(question);

    httpTestingController.verify();

  });



  it('should update existing questions associated with the test', async () => {
    // Arrange
    const testID = 1;
    const test = { description: 'Test 1', categoryID: 1, active: true, createdDate: new Date(12 - 7 - 2023), isDeleted: false };
    const question = { id: 1, testID: 1, question: 'Question 1', questionType: 1, active: true, isDeleted: false, mandatory: true, options: 'a,b,c,d', correctAnswers: '0,1,0,0' };

    // Act
    // Note: Using 'any' to access the private methods
    (service as any).httpPutQuestion = jasmine.createSpy().and.returnValue(Promise.resolve({}));
    const promise = service.saveTest({ ...test, questions: [question] }, testID);
    const req = httpTestingController.expectOne(`${(service as any).jsonServerURLTest}/${testID}`);
    expect(req.request.method).toEqual('PUT');
    req.flush({});
    // Assert
    await promise;

    // Note: Using 'any' to access the private methods

    expect((service as any).httpPutQuestion).toHaveBeenCalledWith(`${(service as any).jsonServerURLQuestion}/${question.id}`, question);

    httpTestingController.verify();

  });

 
});
