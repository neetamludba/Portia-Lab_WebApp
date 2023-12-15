import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAssignmentDetailComponent } from './test-assignment-detail.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TestAssignmentDetailComponent', () => {
  let component: TestAssignmentDetailComponent;
  let fixture: ComponentFixture<TestAssignmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestAssignmentDetailComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }, // Mock MatDialogRef if used in the component
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Mock MAT_DIALOG_DATA if used in the component
        // Other necessary providers
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAssignmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
