import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAttemptListComponent } from './my-attempt-list.component';

describe('MyAttemptListComponent', () => {
  let component: MyAttemptListComponent;
  let fixture: ComponentFixture<MyAttemptListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAttemptListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAttemptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
