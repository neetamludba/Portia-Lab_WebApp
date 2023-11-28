import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssignmentListComponent } from './my-assignment-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MyAssignmentListComponent', () => {
  let component: MyAssignmentListComponent;
  let fixture: ComponentFixture<MyAssignmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAssignmentListComponent],
      imports: [HttpClientTestingModule]
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
