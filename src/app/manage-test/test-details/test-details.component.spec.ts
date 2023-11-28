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

describe('TestDetailsComponent', () => {
  let component: TestDetailsComponent;
  let fixture: ComponentFixture<TestDetailsComponent>;
  let testService: TestService;
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

  it('should log the error when an error occurs during saving', async () => {
    // Arrange
    const testError = new Error('Test error');
    spyOn(console, 'log');
    spyOn(testService, 'saveTest').and.throwError(testError);

    // Act
    await component.saveTest();

    // Assert
    expect(console.log).toHaveBeenCalledWith(testError);
  });

  it('should handle undefined error when saving', async () => {
    // Arrange
    spyOn(console, 'log');
    spyOn(testService, 'saveTest').and.returnValue(Promise.reject(undefined));

    // Act
    await component.saveTest();

    // Assert
    expect(console.log).toHaveBeenCalledWith(undefined);
  });
  it('should save test', async () => {
    spyOn(testService, 'saveTest').and.stub();

    const navigateByUrlSpy = spyOn(component['router'], 'navigateByUrl');
    navigateByUrlSpy.and.stub();

    fixture.detectChanges();
    await fixture.whenStable();


    component.saveTest();


    await expect(testService.saveTest).toHaveBeenCalledWith({
      description: 'Test Description',
      categoryID: 1,
      active: true,
      questions: [
        {
          id: 1,
          testID: 1,
          question: 'Question 1',
          questionType: 'Type 1',
          active: true,
          isDeleted: false,
        },
        {
          id: 2,
          testID: 1,
          question: 'Question 2',
          questionType: 'Type 2',
          active: true,
          isDeleted: false,
        },
      ],
    }, 1);

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/test')


  });

  it('should add a Question', async () => {
    // Mock data
    const questionIndex = 0;
    const crntQuestion: Question = {
      questionID: 1,
      testID: 1,
      question: 'Question 1',
      questionType: 1,
      mandatory: true,
      options: 'x,y,z',
      correctAnswers: '2',
      active: true,
      displayOrder: 1
    };
    const filteredTestQuestions: Question[] = [];
    const deletedTestQuestions: Question[] = [crntQuestion];

    // Set component properties
    component.testQuestions = filteredTestQuestions;

    // Call the deleteQuestion method
    component.editQuestion(questionIndex);

    // Assert that the question was deleted
    expect(component.testQuestions.length).toBe(1);

    // Assert that other properties are updated as expected
    expect(component.dsQuestions.data.length).toBe(1);
    expect(component.testDetailsForm.dirty).toBe(true);

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