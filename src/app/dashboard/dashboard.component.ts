import { Component, AfterViewInit } from '@angular/core';
import { AccountService } from 'app/account/account.service';
import { UserService } from 'app/manage-user/user.service';
import { User } from 'app/models/user.model';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  constructor(
    private accountService: AccountService,
    private dashboardService: DashboardService,
    private userService: UserService,
    private router: Router
  ) { }

  users: any;
  categoryWiseData: any;
  testWiseData: any;
  data: any;

  runTestWise: boolean = false;
  runCategoryWise: boolean = false;

  ngAfterViewInit() {
    let crntUser = this.accountService.userValue;

    if (crntUser) {
      if (!isNaN(crntUser.userID) && crntUser.userID > 0) {
        if (crntUser.userType === 'Admin' || crntUser.userType === 'Teacher' ||crntUser.companyID === -1) {
          {
            this.userService.getAllUsers().then((users) => {
              this.users = users;
            });

            this.dashboardService.getAdminData().then((dashboardData) => {
              this.data = dashboardData;
            });

            this.dashboardService
              .getCategoryWiseUsersScoreForAdmin()
              .then((categoryWiseData) => {
                this.categoryWiseData = categoryWiseData;
                this.runCategoryWise = true;
              });

            this.dashboardService
              .getTestWiseUserScoresForAdmin()
              .then((testWiseData) => {
                this.testWiseData = testWiseData;
                this.runTestWise = true;
              });
          }
        } else {
          this.users = [crntUser];

          this.dashboardService
            .getUserData(crntUser.userID)
            .then((dashboardData) => {
              this.data = dashboardData;
            });

          this.dashboardService
            .getCategoryWiseUserScore(crntUser.userID)
            .then((categoryWiseData) => {
              this.categoryWiseData = categoryWiseData;
              this.runCategoryWise = true;
            });

          this.dashboardService
            .getTestWiseUserScoresForUser(crntUser.userID)
            .then((testWiseData) => {
              this.testWiseData = testWiseData;
              this.runTestWise = true;

            });
        }
      }
    }
  }

  assignmentsCache: { [key: string]: any } = {};

  getAssignmentsForUser(test: any, userId: number) {

    const cacheKey = `${test.testID}-${userId}`;
    if (this.assignmentsCache[cacheKey] !== undefined) {
      return this.assignmentsCache[cacheKey];
    }

    if (!test || test.assignments.length === 0) {
      let result = '-'
      this.assignmentsCache[cacheKey] = result;
      return result;
    }

    const userAssignment = test.assignments.filter(
      (a: any) => a.assignedToID === userId
    );

    if (userAssignment.length) {
      let result = userAssignment.length
      this.assignmentsCache[cacheKey] = result;
      return result;
    } else {
      let result = '-'
      this.assignmentsCache[cacheKey] = result;
      return result;
    }
  }

  attemptsCache: { [key: string]: any } = {};

  getAttemptsForUser(test: any, userId: number) {
    const cacheKey = `${test.testID}-${userId}`;
    if (this.attemptsCache[cacheKey] !== undefined) {
      return this.attemptsCache[cacheKey];
    }

    if (!test || test.assignments.length > 0) {
      const userAssignment = test.assignments.filter(
        (a: any) => a.assignedToID === userId
      );

      if (userAssignment.length) {
        let attemptCount = 0;
        userAssignment.forEach((assignmets: { attempts: any; }) => {
          if (assignmets.attempts.length === 1) {
            attemptCount++
          }
        });
        this.attemptsCache[cacheKey] = attemptCount
        return attemptCount
      } else {
        this.attemptsCache[cacheKey] = '-'
        return '-';
      }
    }
    else {
      this.attemptsCache[cacheKey] = '-'
      return '-'
    }
  }

  scoresCache: { [key: string]: any } = {};

  getUserTestScore(user: User, test: any) {
    const cacheKey = `${user.userID}-${test.testID}`;
    if (this.scoresCache[cacheKey] !== undefined) {
      return this.scoresCache[cacheKey];
    }

    if (this.testWiseData) {// Check if testWiseData is defined and an array

      const filteredTestWiseData = this.testWiseData.find(
        (a: any) => test.description === a.testName
      );

      if (filteredTestWiseData) {
        if (user && user.userID !== undefined && filteredTestWiseData.userWiseScores) {
          const userScore = filteredTestWiseData.userWiseScores[user.userID];
          if (userScore !== undefined) {
            let score = (userScore * 100).toFixed(0);
            this.scoresCache[cacheKey] = score
            return score;
          } else {
            this.scoresCache[cacheKey] = '-'
            return '-';
          }
        }
      }
    }
    this.scoresCache[cacheKey] = '-'
    return '-'
  }

  getUserCategoryProgress(user: User, userWiseProgress: any) {
    if (userWiseProgress[user.userID] !== undefined)
      return (userWiseProgress[user.userID] * 100).toFixed(2) + '%';
    else return '-';
  }

  getUserCategoryScore(user: User, userWiseScore: any) {
    if (userWiseScore[user.userID] !== undefined)
      return (userWiseScore[user.userID] * 100).toFixed(2) + '%';
    else return '-';
  }


  gotoAssignmentsOfUser(test: any, user: User) {
    const encodedUserName = encodeURIComponent(user.firstName + ' ' + user.lastName);
    this.router.navigateByUrl(`testassignment/${test.testID}?user=${encodedUserName}`);
  }

  gotoAttemptsStatisticsOfUser(test: any, user: User) {
    this.router.navigateByUrl(`testattemptstats/${test.testID}?userID=${user.userID}`);
  }

  gotoAttemptDetailOfUser(test: any, user: User) {
    const userAssignments = test.assignments.filter(
      (a: any) => user.userID === a.assignedToID
    );

    let attempted = userAssignments.length - 1
    let assignmentID = 0
    while (attempted >= 0) {
      if (userAssignments[attempted].attempts.length) {
        assignmentID = userAssignments[attempted].testAssignmentID
        break;
      }
      attempted--;
    }

    const encodedUserName = encodeURIComponent(user.firstName + ' ' + user.lastName);
    if (assignmentID)
      this.router.navigateByUrl(`testattempt/view/${assignmentID}?user=${encodedUserName}`);

  }
}
