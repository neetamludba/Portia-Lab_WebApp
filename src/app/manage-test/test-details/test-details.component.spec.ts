import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestDetailsComponent } from './test-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestService } from '../test.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { QuestionDetailsComponent } from 'app/manage-question/question-details/question-details.component';
import { Question } from 'app/models/question.model';
import { TestCategory } from 'app/models/test-category.model';
import { TestCategoryService } from 'app/manage-test-category/test-category.service';

describe('TestDetailsComponent', () => {
  let component: TestDetailsComponent;
  let fixture: ComponentFixture<TestDetailsComponent>;
  let testService: TestService;
  let testCategoryService: TestCategoryService;
  let dialog: MatDialog;
  let router: Router;
  let testDetailsForm: FormGroup;

  beforeEach(async () => {
    testDetailsForm = new FormGroup({
      fieldName: new FormControl('', Validators.minLength(5))
    });
    await TestBed.configureTestingModule({

      declarations: [TestDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatOptionModule,
        MatIconModule,
        MatTableModule,
      ],
      providers: [
        TestService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => '1', // Set the 'id' parameter value to '1'
              },
            },
          },
        },
      ],
    }).compileComponents();


    fixture = TestBed.createComponent(TestDetailsComponent);
    component = fixture.componentInstance;
    testService = TestBed.inject(TestService);
    testCategoryService = TestBed.inject(TestCategoryService);
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);

    spyOn(testService, 'getTest').and.returnValue(
      Promise.resolve({
        id: 1,
        description: 'Test Description',
        categoryID: 1,
        active: true,
      })
    );

  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should return an empty string when the field length is equal to 5', () => {
    // Arrange
    testDetailsForm.get('fieldName')?.setValue('valid');

    // Act
    const errorMessage = component.showErrorMessage('fieldName');

    // Assert
    expect(errorMessage).toBe('');
  });

  it('should return an empty string when there are no errors', () => {
    // Arrange
    testDetailsForm.get('fieldName')?.setValue('valid description');

    // Act
    const errorMessage = component.showErrorMessage('fieldName');

    // Assert
    expect(errorMessage).toBe('');
  });

  it('should initialize form and load test details', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.testDetailsForm.get('description')?.value).toBe(
      'Test Description'
    );
    expect(component.testDetailsForm.get('categoryID')?.value).toBe(1);
    expect(component.testDetailsForm.get('active')?.value).toBe(true);
  });

  // Step 1: Describe the test case
  it('should retrieve all test categories on initialization', async () => {

    // Step 2: Prepare mock data for test categories
    const categories: TestCategory[] = [
      { categoryID: 1, name: 'Category 1', Active: true, createdDate: '12 - 7 - 2023', companyID: 1 },
      { categoryID: 2, name: 'Category 2', Active: true, createdDate: '12 - 7 - 2023', companyID: 1 },
    ];

    // Step 3: Create a spy to mock the 'getAllCategories' function of the testService
    spyOn(testCategoryService, 'getAllCategories').and.returnValue(Promise.resolve(categories));

    // Step 4: Call the component's initialization function
    component.ngOnInit();

    // Step 5: Verify that 'getAllCategories' was called and the testCategories were set correctly
    await expect(testCategoryService.getAllCategories).toHaveBeenCalled();

    expect(component.testCategories).toEqual(categories);
  });

  it('should filter questions', () => {
    component.dsQuestions.data = [
      {
        questionID: 1,
        testID: 1,
        question: 'Question 1',
        questionType: 1,
        mandatory: true,
        options: 'x,y,z',
        correctAnswers: '2',
        active: true,
        displayOrder: 1
      },
      {
        questionID: 2,
        testID: 1,
        question: 'Question 2',
        questionType: 2,
        mandatory: true,
        options: 'a,b,c',
        correctAnswers: '2',
        active: true,
        displayOrder: 2
      },
    ];

    component.doFilter('Question 1');
    expect(component.dsQuestions.filter).toBe('question 1');

  });

  it('should change category', () => {
    const e = {
      target: {
        value: 2,
      },
    };
    component.changeCategory(e);

    expect(component.testDetailsForm.value).toEqual({
      categoryID: 2,
      description: null,
      active: null,
    });
  });

  it('should open dialog for question editing', () => {
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of({
        testID: 1,
        questionID: 1,
        question: 'Question 1',
        active: true,
        questionType: 1,
        displayOrder: 1,
        mandatory: true,
        options: 'a,b,c,d',
        correctAnswers: 'true,false,false,false',
      }),
    } as any);
    component.testQuestions = [{
      testID: 1,
      questionID: 1,
      question: 'Question 1',
      active: true,
      questionType: 1,
      displayOrder: 1,
      mandatory: true,
      options: 'a,b,c',
      correctAnswers: 'true,false,false',
    }]
    component.editQuestion(0);

    expect(dialog.open).toHaveBeenCalledWith(QuestionDetailsComponent, {
      data: {
        testID: 1,
        questionID: 1,
        question: 'Question 1',
        active: true,
        questionType: 1,
        displayOrder: 1,
        mandatory: true,
        options: 'a,b,c',
        correctAnswers: 'true,false,false'
      },
      width: '750px',
    });
    expect(component.testQuestions).toEqual([
      {
        questionID: 1,
        active: true,
        questionType: 1,
        displayOrder: 1,
        mandatory: true,
        options: 'a,b,c,d',
        correctAnswers: 'true,false,false,false',
        testID: 1,
        question: 'Question 1',
      },
    ]);
    expect(component.testDetailsForm.dirty).toBeTrue();
  });

  it('should save test', async () => {
    const saveTestResult = {}; // Simulated result of saveTest method

    // Mocking saveTest method of testService
    spyOn(testService, 'saveTest').and.returnValue(Promise.resolve(saveTestResult));

    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
    navigateByUrlSpy.and.stub();

    // Set up test data or component properties needed for the saveTest method

    fixture.detectChanges();
    await fixture.whenStable();

    // Call the method being tested
    await component.saveTest();

    // Assert that saveTest was called with the expected parameters
    expect(testService.saveTest).toHaveBeenCalledWith({
      description: 'Test Description',
      categoryID: 1,
      active: true,
      questions: [
        // Add your expected questions here
      ],
    }, 1);

    // Assert navigation was triggered
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/test');
  });


  it('should clese form', async () => {
    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
    navigateByUrlSpy.and.stub();

    fixture.detectChanges();
    await fixture.whenStable();

    component.closeForm();

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/test')
  });

});