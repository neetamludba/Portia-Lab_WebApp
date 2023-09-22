import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAttemptDetailsComponent } from './test-attempt-details.component';

describe('TestAttemptDetailsComponent', () => {
  let component: TestAttemptDetailsComponent;
  let fixture: ComponentFixture<TestAttemptDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestAttemptDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAttemptDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
