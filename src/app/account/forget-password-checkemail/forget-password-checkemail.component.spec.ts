import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordCheckemailComponent } from './forget-password-checkemail.component';

describe('ForgetPasswordCheckemailComponent', () => {
  let component: ForgetPasswordCheckemailComponent;
  let fixture: ComponentFixture<ForgetPasswordCheckemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordCheckemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordCheckemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
