import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestService } from '../test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { QuestionDetailsComponent } from 'app/manage-question/question-details/question-details.component';
import { MatDialog } from '@angular/material/dialog';
import { TestCategoryService } from 'app/manage-test-category/test-category.service';
import { TestCategory } from 'app/manage-test-category/category-list/category-list.component';
import { Question } from 'app/models/question.model';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css'],
})
export class TestDetailsComponent {
  constructor(
    private testService: TestService,
    private testCategoryService: TestCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  testDetailsForm = new FormGroup({
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    categoryID: new FormControl(null),
    active: new FormControl(true),
  });

  testId: number = 0;
  testQuestions: Question[] = [];
  testCategories: TestCategory[] = [];

  displayedColumns: string[] = [
    'questionNumber',
    'question',
    'questionType',
    'displayOrder',
    'active',
    'actions',
  ];

  dsQuestions = new MatTableDataSource<Question>([]);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.getTestCategoris();

    let id = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(id) && id > 0) {
      this.testId = id;
      this.getTest(this.testId);
    }
  }

  showErrorMessage(fieldName: string) {
    let errors = this.testDetailsForm.get(fieldName)?.errors;

    if (errors) {
      //console.log({ fieldName }, { errors }, errors['required']);

      if (errors['required']) return 'Test description is required';
      if (errors['minlength'])
        return 'Test description must be 5 characters long';
      return '';
    } else return '';
  }

  doFilter(value: string) {
    this.dsQuestions.filter = value.trim().toLocaleLowerCase();
  }

  getTestCategoris() {
    this.testCategoryService
      .getAllCategories()
      .then((categories) => {
        this.testCategories = categories;
      })
      .catch((err) => console.log(err));
  }

  getTest(testId: number) {
    this.testService.getTest(testId).then((test) => {
      this.testDetailsForm.setValue({
        description: test.description,
        categoryID: test.categoryID,
        active: test.active,
      });
      this.dsQuestions = new MatTableDataSource<Question>(test.questions);
      this.dsQuestions.sort = this.sort;

      this.testQuestions = test.questions.slice();
    });
  }

  changeCategory(e: any) {
    this.testDetailsForm.setValue({ categoryID: e.target.value });
  }

  editQuestion(questionIndex: number) {
    let question;

    if (questionIndex === -1)
      question = {
        questionID: -1,
        testID: this.testId,
        options: 'a,b,c',
      };
    else question = this.testQuestions[questionIndex];

    // console.log({ questionIndex }, { question });

    const dialogRef = this.dialog.open(QuestionDetailsComponent, {
      data: question,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (questionIndex === -1) {
          this.testQuestions.push({
            questionID: 0,
            testID: this.testId,
            ...result,
          });
        } else {
          const crntQuestion = this.testQuestions[questionIndex];

          this.testQuestions[questionIndex] = {
            ...crntQuestion,
            ...result,
          };
        }

        this.dsQuestions = new MatTableDataSource<Question>(this.testQuestions);

        this.testDetailsForm.markAsDirty();
      }
    });
  }

  saveTest() {
    this.testService
      .saveTest(
        {
          description: this.testDetailsForm.get('description')?.value,
          categoryID: this.testDetailsForm.get('categoryID')?.value,
          active: Boolean(this.testDetailsForm.get('active')?.value),
          questions: this.testQuestions.slice(),
        },
        this.testId
      )
      .then(() =>
        this.router.navigateByUrl('test').catch((error) => {
          console.log(error);
        })
      )
      .catch((ex) => console.log(ex));
  }

  closeForm() {
    this.router.navigateByUrl('test').catch((error) => {
      console.log(error);
    });
  }
}
