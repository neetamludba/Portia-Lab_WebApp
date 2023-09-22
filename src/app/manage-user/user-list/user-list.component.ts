import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'app/models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements AfterViewInit {
  constructor(private userService: UserService, private router: Router) {}

  displayedColumns: string[] = [
    'email',
    'firstName',
    'lastName',
    'password',
    'registerationDate',
    'active',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.userService.getAllUsers().then((users) => {
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.sort = this.sort;
    });
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  createUser() {
    this.router.navigateByUrl('user/create').catch((error) => {
      console.log(error);
    });
  }
}
