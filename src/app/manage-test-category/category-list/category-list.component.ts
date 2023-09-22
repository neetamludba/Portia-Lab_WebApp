import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TestCategoryService } from '../test-category.service';

export interface TestCategory {
  categoryID: number;
  name: string;
  companyID: number;
  Active: boolean;
  createdDate: string;
}

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements AfterViewInit {
  constructor(
    private testCategoryService: TestCategoryService,
    private router: Router
  ) {}

  displayedColumns: string[] = ['name', 'Active', 'createdDate', 'actions'];
  dataSource = new MatTableDataSource<TestCategory>([]);

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.testCategoryService.getAllCategories().then((categories) => {
      this.dataSource = new MatTableDataSource<TestCategory>(categories);
      this.dataSource.sort = this.sort;
    });
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  createCategory() {
    this.router.navigateByUrl('testcategory/create').catch((error) => {
      console.log(error);
    });
  }
}
