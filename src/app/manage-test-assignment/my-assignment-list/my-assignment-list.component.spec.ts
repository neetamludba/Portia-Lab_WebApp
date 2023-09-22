import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssignmentListComponent } from './my-assignment-list.component';

describe('MyAssignmentListComponent', () => {
  let component: MyAssignmentListComponent;
  let fixture: ComponentFixture<MyAssignmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAssignmentListComponent ]
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
