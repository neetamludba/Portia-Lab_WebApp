import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TestAssignmentService } from '../test-assignment.service';
import { TestAssignment } from 'app/models/test-assignment.model';
import { AccountService } from 'app/account/account.service';

@Component({
  selector: 'app-my-assignment-list',
  templateUrl: './my-assignment-list.component.html',
  styleUrls: ['./my-assignment-list.component.css'],
})
export class MyAssignmentListComponent implements AfterViewInit {
  constructor(
    private assignmentService: TestAssignmentService,
    private accountService: AccountService,
    private router: Router
  ) {}

  displayedColumns: string[] = ['testDescription', 'assignedDate', 'action'];

  dataSource = new MatTableDataSource<TestAssignment>([]);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngAfterViewInit() {
    let crntUser = this.accountService.userValue;

    if (crntUser) {
      if (!isNaN(crntUser.userID) && crntUser.userID > 0) {
        this.getMyAssignments(crntUser.userID);
      }
    }
  }

  getMyAssignments(userID: number) {
    this.assignmentService
      .getAllAssignmentsForUser(userID)
      .then((assignments) => {
        this.dataSource = new MatTableDataSource<TestAssignment>(assignments);
        this.dataSource.sort = this.sort;
      });
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  startNewAttempt(testAssignmentID: number) {
    this.router
      .navigateByUrl('testattempt/create/' + testAssignmentID)
      .catch((error) => {
        console.log(error);
      });
  }

  viewAttempt(testAssignmentID: number) {
    this.router
      .navigateByUrl('testattempt/view/' + testAssignmentID)
      .catch((error) => {
        console.log(error);
      });
  }
}
