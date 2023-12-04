import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TestService } from 'app/manage-test/test.service';
import { Answer } from 'app/models/answer.model';
import { Question } from 'app/models/question.model';
import { TestAttemptService } from '../test-attempt.service';
import { TestAssignmentService } from 'app/manage-test-assignment/test-assignment.service';

@Component({
  selector: 'app-test-attempt-details',
  templateUrl: './test-attempt-details.component.html',
  styleUrls: ['./test-attempt-details.component.css'],
})
export class TestAttemptDetailsComponent implements OnInit {
  constructor(
    private testService: TestService,
    private assignmentService: TestAssignmentService,
    private testAttenptService: TestAttemptService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  attemptDetailsForm = this.formBuilder.group({
    answersArray: this.formBuilder.array([]),
  });

  assignment: any;
  testAssignmentID: number = 0;
  questions: Question[] = [];
  answers: Answer[] = [];
  testName: string = '';
  currentQuestionIndex = -1;
  loadingFinishButton = false;

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(id) && id > 0) {
      this.testAssignmentID = id;
      this.getAssignmentDetails(this.testAssignmentID);
    }
  }

  get answersArray() {
    return this.attemptDetailsForm.controls['answersArray'] as FormArray;
  }

  answerControl(index: number) {
    return this.answersArray.controls[index] as FormControl;
  }

  answerGroup(index: number) {
    return this.answersArray.controls[index] as FormGroup;
  }

  getAssignmentDetails(testAssignmentId: number) {
    this.assignmentService
      .getAssignment(testAssignmentId)
      .then((assignment) => {
        this.assignment = assignment;

        this.getTest(assignment.testID);
      });
  }

  getTest(testId: number) {
    this.testService.getTest(testId).then((test) => {
      this.questions = test.questions
        .sort((a: Question, b: Question) => a.displayOrder - b.displayOrder)// to be change to random. for now...
        .slice();
      this.testName = test.description;

      this.questions.forEach((q: Question) => {
        if (q.questionType === 2) {
          let checkboxFormGroup = new FormGroup({});

          q.options.split(',').forEach((option: string, index: number) => {
            checkboxFormGroup.addControl('chk_' + index, new FormControl(''));
          });

          this.answersArray.push(checkboxFormGroup);
        } else
          this.answersArray.push(new FormControl('', [Validators.required]));
      });

      this.currentQuestionIndex = 0;
    });
  }

  gotoNextQuestion() {
    this.currentQuestionIndex++;
  }

  goBackToQuestion() {
    this.currentQuestionIndex--;
  }

  submitAttempt() {
    this.loadingFinishButton = true;
    const answers = this.answersArray.controls.map((answer, index: number) => {
      // console.log('#' + index + ': ', answer);

      const question = this.questions[index];
      let answerValue = '';

      if (question.questionType === 1) answerValue = answer.value;
      else {
        // console.log(Object.entries(answer.value));

        answerValue = Object.entries(answer.value).reduce(
          (prev, crnt, index) => {
            if (crnt[1] === true)
              return prev === ''
                ? index.toString()
                : prev + ',' + index.toString();
            else return prev;
          },
          ''
        );
      }

      return {
        answerID: 0,
        attemptID: 0,
        questionID: question.questionID,
        skipped: false,
        answer: answerValue,
      };
    });

    // console.log({ answers });

    this.testAttenptService
      .saveTestAttempt({
        attemptID: 0,
        testID: this.assignment.testID,
        userID: this.assignment.assignedToID,
        testAssignmentID: this.assignment.testAssignmentID,
        answers: answers,
      })
      .then(() => {
        this.loadingFinishButton = false
        this.router.navigateByUrl('mytests').catch((error) => {
          console.log(error);
        })
      }
      )
      .catch((ex) => console.log(ex));
  }
}
