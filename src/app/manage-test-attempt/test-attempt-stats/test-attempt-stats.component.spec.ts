import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAttemptStatsComponent } from './test-attempt-stats.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('TestAttemptStatsComponent', () => {
  let component: TestAttemptStatsComponent;
  let fixture: ComponentFixture<TestAttemptStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestAttemptStatsComponent],
      imports: [RouterTestingModule,
        HttpClientTestingModule,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAttemptStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
