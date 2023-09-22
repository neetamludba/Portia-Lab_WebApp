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

  ngAfterViewInit() {
    let crntUser = this.accountService.userValue;

    if (crntUser) {
      if (!isNaN(crntUser.userID) && crntUser.userID > 0) {
        if (crntUser.companyID === -1) {
          {
            this.userService.getAllUsers().then((users) => {
              // console.log({ users });
              this.users = users;
            });

            this.dashboardService.getAdminData().then((dashboardData) => {
              console.log({ dashboardData });
              this.data = dashboardData;
            });

            this.dashboardService
              .getCategoryWiseUsersScoreForAdmin()
              .then((categoryWiseData) => {
                // console.log({ categoryWiseData });
                this.categoryWiseData = categoryWiseData;
              });

            this.dashboardService
              .getTestWiseUserScoresForAdmin()
              .then((testWiseData) => {
                // console.log({ testWiseData });
                this.testWiseData = testWiseData;
              });
          }
        } else {
          this.users = [crntUser];

          this.dashboardService
            .getUserData(crntUser.userID)
            .then((dashboardData) => {
              // console.log(dashboardData);
              this.data = dashboardData;
            });

          this.dashboardService
            .getCategoryWiseUserScore(crntUser.userID)
            .then((categoryWiseData) => {
              // console.log({ categoryWiseData });
              this.categoryWiseData = categoryWiseData;
            });

          this.dashboardService
            .getTestWiseUserScoresForUser(crntUser.userID)
            .then((testWiseData) => {
              // console.log({ testWiseData });
              this.testWiseData = testWiseData;
            });
        }
      }
    }
  }

  getAssignmentsForUser(test: any, userId: number) {
    // console.log(test)
    if (test) {
      if (test.assignments.length > 0) {
        const userAssignment = test.assignments.filter(
          (a: any) => a.assignedToID === userId
        );

        if (userAssignment.length) {
          // console.log(userAssignment)

          // if (userAssignment[userAssignment.length - 1].attempts.length > 0) {
          //   return '✔'; // Tick symbol
          // }

          // return '✘'; // Cross symbol
          return userAssignment.length
        } else {
          return '-';
        }
      }
      else {
        return '-'
      }
    } else {
      return '-';
    }
  }

  getAttemptsForUser(test: any, userId: number) {
    // console.log(test)
    if (test) {
      if (test.assignments.length > 0) {
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

          return attemptCount
        } else {
          return '-';
        }
      }
      else {
        return '-'
      }
    } else {
      return '-';
    }
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

  getUserTestScore(user: User, test: any) { // Check if testWiseData is defined and an array
    if (this.testWiseData) {
      const filteredTestWiseData = this.testWiseData.find(
        (a: any) => test.description === a.testName
      );
      // console.log(filteredTestWiseData)


      if (filteredTestWiseData) {
        // Check if user.userID is defined
        // console.log(filteredTestWiseData.userWiseScores)
        if (user && user.userID !== undefined && filteredTestWiseData.userWiseScores) {
          const userScore = filteredTestWiseData.userWiseScores[user.userID];
          if (userScore !== undefined) {
            return (userScore * 100).toFixed(0);
          } else {
            return '-';
          }
        }
      }
    }
    return '-'
  }

  gotoAssignmentsOfUser(test: any, user: User) {
    const encodedUserName = encodeURIComponent(user.firstName + ' ' + user.lastName);
    this.router.navigateByUrl(`testassignment/${test.testID}?user=${encodedUserName}`);
  }

  gotoAttemptsStatisticsOfUser(test: any, user: User) {
    this.router.navigateByUrl(`testattemptstats/${test.testID}?userID=${user.userID}`);
  }

  gotoAttemptDetailOfUser(test: any, user: User) {
    console.log(test)
    const userAssignments = test.assignments.filter(
      (a: any) => user.userID === a.assignedToID
    );
    console.log(userAssignments)

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
