import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmUserComponent } from './account/confirm-user/confirm-user.component';
import { ForgetPasswordCheckemailComponent } from './account/forget-password-checkemail/forget-password-checkemail.component';
import { ForgetPasswordComponent } from './account/forget-password/forget-password.component';
import { LoginComponent } from './account/login/login.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './helpers/auth.guard';
import { MyAssignmentListComponent } from './manage-test-assignment/my-assignment-list/my-assignment-list.component';
import { TestAssignmentListComponent } from './manage-test-assignment/test-assignment-list/test-assignment-list.component';
import { TestAttemptDetailsComponent } from './manage-test-attempt/test-attempt-details/test-attempt-details.component';
import { TestAttemptStatsComponent } from './manage-test-attempt/test-attempt-stats/test-attempt-stats.component';
import { ViewTestAttemptComponent } from './manage-test-attempt/view-test-attempt/view-test-attempt.component';
import { CategoryDetailsComponent } from './manage-test-category/category-details/category-details.component';
import { CategoryListComponent } from './manage-test-category/category-list/category-list.component';
import { TestDetailsComponent } from './manage-test/test-details/test-details.component';
import { TestListComponent } from './manage-test/test-list/test-list.component';
import { UserDetailsComponent } from './manage-user/user-details/user-details.component';
import { UserListComponent } from './manage-user/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Dashboard',
    },
  },
  {
    path: 'account/login',
    component: LoginComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    // pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Reset Password' }
  },
  {
    path: 'failed-reset-password',
    component: ResetPasswordComponent,
    // pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { title: 'Reset Password Failed' }
  },
  {
    path: 'account/forgetpassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'account/forgetpasswordcheckemail',
    component: ForgetPasswordCheckemailComponent,
  },
  {
    path: 'account/resetpassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'account/confirmuser',
    component: ConfirmUserComponent,
  },
  {
    path: 'testcategory',
    component: CategoryListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Test Category',
    },
  },
  {
    path: 'testcategory/create',
    component: CategoryDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Test Category Details',
    },
  },
  {
    path: 'testcategory/:id',
    component: CategoryDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Test Category Details',
    },
  },
  {
    path: 'test',
    component: TestListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Tests',
    },
  },
  {
    path: 'test/create',
    component: TestDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Test Details',
    },
  },
  {
    path: 'test/:id',
    component: TestDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Test Details',
    },
  },
  {
    path: 'testassignment/:id',
    component: TestAssignmentListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Test Assignment Details',
    },
  },
  {
    path: 'mytests',
    component: MyAssignmentListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_USER',
      title: 'My Tests',
    },
  },
  {
    path: 'testattempt/create/:id',
    component: TestAttemptDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Test Attempt Details',
    },
  },
  {
    path: 'testattempt/view/:id',
    component: ViewTestAttemptComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Test Attempt Details',
    },
  },
  {
    path: 'testattemptstats/:id',
    component: TestAttemptStatsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Test Attempt Statistics',
    },
  },
  {
    path: 'user',
    component: UserListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'Users',
    },
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN',
      title: 'User Details',
    },
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
