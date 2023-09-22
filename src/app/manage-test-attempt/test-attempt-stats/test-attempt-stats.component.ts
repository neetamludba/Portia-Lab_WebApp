import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'app/manage-test/test.service';

import { TestAttemptService } from '../test-attempt.service';

@Component({
  selector: 'app-test-attempt-stats',
  templateUrl: './test-attempt-stats.component.html',
  styleUrls: ['./test-attempt-stats.component.css'],
})
export class TestAttemptStatsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private readonly testService: TestService,
    private readonly testAttemptService: TestAttemptService
  ) { }

  attempts: any;
  testDescription: string = '';
  attemptStats: any = [];
  userID: any = null;
  totalAttempts: number = 0;

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.filterByParams()
    if (!isNaN(id) && id > 0) {
      this.getTestDetails(id);
      this.getAllAttempts(id);
    }
  }

  getTestDetails(testID: number) {
    this.testService
      .getTest(testID)
      .then((test) => (this.testDescription = test.description))
      .catch((err) => console.log(err));
  }

  getAllAttempts(testID: number) {
    this.testAttemptService
      .getAllAttemptsForTest(testID)
      .then((attemptsDetail) => {
        console.log({ attemptsDetail });
        console.log(this.userID)
        if (this.userID) {
          this.attempts = attemptsDetail;
          this.attempts = this.attempts.filter((a: any) => a.userID == this.userID)
          console.log(this.attempts);
          this.totalAttempts = this.attempts.length;

        }
        else {
          this.attempts = attemptsDetail;

          this.totalAttempts = attemptsDetail.length;

        }
        let questionCorrectCount: any = [];

        this.attempts.forEach((attempt: any) => {
          attempt.result.forEach((result: any, i: number) => {
            // Creating associative array
            const index = 'Q' + (i + 1);
            questionCorrectCount[index] = questionCorrectCount[index]
              ? questionCorrectCount[index] + (result.isCorrect ? 1 : 0)
              : result.isCorrect
                ? 1
                : 0;
          });
        });

        for (let key in questionCorrectCount) {
          this.attemptStats.push(
            Math.round((questionCorrectCount[key] / this.totalAttempts) * 100)
          );
        }
      })
      .catch((err) => console.log(err));
  }

  async filterByParams() {
    const params = this.route.snapshot.queryParams;

    if (params['userID']) {
      // Retrieve the user name from the query parameters
      const userID = decodeURIComponent(params['userID']);
      // Call the filter method with the user name
      this.userID = userID;
    }
  }
}
