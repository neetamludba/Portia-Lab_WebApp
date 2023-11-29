import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TestService } from '../test.service';
import { TestCategory } from 'app/models/test-category.model'; 
import { TestCategoryService } from 'app/manage-test-category/test-category.service';
import { Test } from 'app/models/test.model';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css'],
})
export class TestListComponent implements AfterViewInit {
  constructor(private testService: TestService, private router: Router,    private testCategoryService: TestCategoryService,
    ) {}

  displayedColumns: string[] = [
    'description',
    'category',
    'active',
    'createdDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<Test>([]);

  testCategories: TestCategory[] = [];


  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.testService.getAllTests().then((tests) => {
      this.dataSource = new MatTableDataSource<Test>(tests);
      this.dataSource.sort = this.sort;
    });
    this.getTestCategories();
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getTestCategories() {
    this.testCategoryService
      .getAllCategories()
      .then((categories) => {
        this.testCategories = categories;
      })
      .catch((err) => console.log(err));
      // console.log("Categories" + this.testCategories)
  }

  createTest() {
    this.router.navigateByUrl('/test/create');
  }
}
