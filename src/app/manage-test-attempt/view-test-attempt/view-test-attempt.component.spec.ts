import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestAttemptComponent } from './view-test-attempt.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewTestAttemptComponent', () => {
  let component: ViewTestAttemptComponent;
  let fixture: ComponentFixture<ViewTestAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTestAttemptComponent],
      imports: [RouterTestingModule,
        HttpClientTestingModule,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
