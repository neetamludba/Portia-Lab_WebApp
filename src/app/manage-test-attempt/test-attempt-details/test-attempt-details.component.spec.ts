import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAttemptDetailsComponent } from './test-attempt-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('TestAttemptDetailsComponent', () => {
  let component: TestAttemptDetailsComponent;
  let fixture: ComponentFixture<TestAttemptDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestAttemptDetailsComponent],
      imports: [
        MatCardModule,
        MatRadioModule,
        MatCheckboxModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,]
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
