import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssignmentListComponent } from './my-assignment-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MyAssignmentListComponent', () => {
  let component: MyAssignmentListComponent;
  let fixture: ComponentFixture<MyAssignmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAssignmentListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        FormsModule,
        BrowserAnimationsModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAssignmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
