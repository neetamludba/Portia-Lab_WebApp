import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAssignmentListComponent } from './test-assignment-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestAssignmentService } from '../test-assignment.service';
import { ActivatedRoute } from '@angular/router';

describe('TestAssignmentListComponent', () => {
  let component: TestAssignmentListComponent;
  let fixture: ComponentFixture<TestAssignmentListComponent>;
  let testAssignmentService: TestAssignmentService;
  let dialog: MatDialog; // Initialize the dialog service

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestAssignmentListComponent],
      imports: [
        MatIconModule, // Import Angular Material icon module
        MatFormFieldModule, // Import Angular Material form field module
        HttpClientTestingModule, // Import the mock HttpClient module for testing HTTP requests
        MatInputModule, // Import Angular Material input module
        MatTableModule, // Import Angular Material table module
        MatSortModule, // Import Angular Material sorting module
        BrowserAnimationsModule, // Import Angular animations module
        MatDialogModule
      ], providers: [
        TestAssignmentService,
        // Provide ActivatedRoute as a service
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => '1' // Set the 'id' parameter value to '1'
              }
            }
          }
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAssignmentListComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog); // Initialize the dialog service from TestBed
    testAssignmentService = TestBed.inject(TestAssignmentService); // Initialize the test service from TestBed
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
