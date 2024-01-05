import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TestAssignmentService } from '../test-assignment.service';
import { TestAssignment } from 'app/models/test-assignment.model';
import { TestAssignmentDetailComponent } from '../test-assignment-detail/test-assignment-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-test-assignment-list',
  templateUrl: './test-assignment-list.component.html',
  styleUrls: ['./test-assignment-list.component.css'],
})
export class TestAssignmentListComponent implements AfterViewInit {
  constructor(
    private assignmentService: TestAssignmentService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  testID: number = 0;

  testName: string = '';
  displayedColumns: string[] = ['assignedToName', 'assignedDate'];

  dataSource = new MatTableDataSource<TestAssignment>([]);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  async ngAfterViewInit() {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!isNaN(id) && id > 0) {
      this.testID = id;
      await this.getAssignments(this.testID);
      await this.getTest(this.testID);
    }
  }
  
  async getTest(testID: number) {
    try {
      const test = await this.assignmentService.getTest(testID);
      this.testName = test.description;
      
      // After getting test data, apply the filter if necessary
      await this.filterByParams();
    } catch (error) {
      // Handle errors here
    }
  }
  
  async getAssignments(testID: number) {
    try {
      const assignments = await this.assignmentService.getAllAssignmentsForTest(testID);
      
      this.dataSource = new MatTableDataSource<TestAssignment>(assignments);
      this.dataSource.sort = this.sort;
      
      // After loading assignments data, apply the filter if necessary
      await this.filterByParams();
    } catch (error) {
      // Handle errors here
    }
  }
  
  async filterByParams() {
    const params = this.route.snapshot.queryParams;
    
    if (params['user']) {
      // Retrieve the user name from the query parameters
      const userName = decodeURIComponent(params['user']);
      // Call the filter method with the user name
      this.doFilter(userName);
    }
  }
  
  public doFilter(value: string) {
    if (this.dataSource) {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
  }

  assignTest() {
    let assignment: any = { testID: this.testID };

    const dialogRef = this.dialog.open(TestAssignmentDetailComponent, {
      data: assignment,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {

        this.assignmentService
          .addAssignment({
            ...result,
            assignedByID: 1,
          })
          .then(() => this.getAssignments(this.testID))
          .catch((err) => console.log(err));
      }
    });
  }
}
