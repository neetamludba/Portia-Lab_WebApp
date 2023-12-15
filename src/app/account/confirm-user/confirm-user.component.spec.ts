import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import the necessary modules for form handling
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmUserComponent } from './confirm-user.component';
import { AccountService } from '../account.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmUserComponent', () => {
  let component: ConfirmUserComponent;
  let fixture: ComponentFixture<ConfirmUserComponent>;

  // Create a mock ActivatedRoute and Router
  const mockActivatedRoute = {
    snapshot: {
      queryParams: { token: 'your-test-token' },
    },
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmUserComponent],
      imports: [
        FormsModule, 
        ReactiveFormsModule, 
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ], // Import the necessary form modules
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Provide the mock ActivatedRoute
        { provide: Router, useValue: mockRouter }, // Provide the mock Router
        // You may also need to provide a mock for your AccountService if it's being used in the component.
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
