import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageTestCategoryModule } from './manage-test-category/manage-test-category.module';
import { ManageTestModule } from './manage-test/manage-test.module';
import { ManageQuestionModule } from './manage-question/manage-question.module';
import { ManageTestAssignmentModule } from './manage-test-assignment/manage-test-assignment.module';
import { ManageTestAttemptModule } from './manage-test-attempt/manage-test-attempt.module';
import { AccountModule } from './account/account.module';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { Injector } from '@angular/core';
import { ManageUserModule } from './manage-user/manage-user.module';
import { DashboardModule } from './dashboard/dashboard.module';

export let InjectorInstance: Injector;

@NgModule({
  declarations: [AppComponent, MainNavigationComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ManageTestCategoryModule,
    ManageTestModule,
    ManageQuestionModule,
    ManageTestAssignmentModule,
    ManageTestAttemptModule,
    AccountModule,
    ManageUserModule,
    DashboardModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    InjectorInstance = this.injector;
  }
}
