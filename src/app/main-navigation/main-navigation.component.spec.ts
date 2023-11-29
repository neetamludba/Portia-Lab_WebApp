import { LayoutModule } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MainNavigationComponent } from './main-navigation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';

describe('MainNavigationComponent', () => {
  let component: MainNavigationComponent;
  let fixture: ComponentFixture<MainNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainNavigationComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
    });

    fixture = TestBed.createComponent(MainNavigationComponent);
    component = fixture.componentInstance;
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('isSuperAdmin method exists', () => {

    expect(component.isSuperAdmin()).toBeDefined;
  });

  it('isAdmin method exists', () => {

    expect(component.isAdmin()).toBeDefined;
  });

  it('isTeacher method exists', () => {

    expect(component.isTeacher()).toBeDefined;
  });

});
