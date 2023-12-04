import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'app/models/user.model';
import { UserService } from '../user.service';
import { AccountService } from 'app/account/account.service';
import { SessionUser } from 'app/models/session.user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements AfterViewInit {
  constructor(private userService: UserService, private router: Router, private accountService: AccountService) { }

  displayedColumns: string[] = [
    'email',
    'firstName',
    'lastName',
    'password',
    'userType',
    'registerationDate',
    'active',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  async ngAfterViewInit() {
    let crntUser = await this.currentUser();


    if (crntUser && crntUser.userType === 'Admin' && crntUser.companyID === -1) {
      this.userService.getAllUsers().then((users) => {
        this.dataSource = new MatTableDataSource<User>(users);
        this.dataSource.sort = this.sort;
      });
    }
    else if (crntUser && crntUser.userType === 'Admin') {
      this.userService.getAllUsersForAdmin(crntUser.companyID).then((users) => {
        this.dataSource = new MatTableDataSource<User>(users);
        this.dataSource.sort = this.sort;
      });
    }
    else if (crntUser && crntUser.userType === 'Teacher') {
      this.userService.getAllUsersForTeacher(crntUser.companyID).then((users) => {
        this.dataSource = new MatTableDataSource<User>(users);
        this.dataSource.sort = this.sort;
      });
    }


  }
  async currentUser(): Promise<SessionUser> {
    return this.accountService.userValue
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  createUser() {
    this.router.navigateByUrl('user/create');
  }
}
