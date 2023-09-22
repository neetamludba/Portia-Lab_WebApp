import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestCategoryService } from '../test-category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  constructor(
    private testCategoryService: TestCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  categoryDetailsForm = new FormGroup({
    categoryName: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    active: new FormControl(true),
  });

  categoryId: number = 0;

  ngOnInit(): void {
    let id = Number(this.route.snapshot.paramMap.get('id'));

    if (!isNaN(id) && id > 0) {
      this.categoryId = id;
      this.getCategory(this.categoryId);
    }
  }

  showErrorMessage(fieldName: string) {
    let errors = this.categoryDetailsForm.get(fieldName)?.errors;

    if (errors) {
      //console.log({ fieldName }, { errors }, errors['required']);

      if (errors['required']) return 'Category name is required';
      if (errors['minlength']) return 'Category name must be 5 characters long';
      return '';
    } else return '';
  }

  getCategory(categoryId: number) {
    this.testCategoryService.getCategory(categoryId).then((category) => {
      this.categoryDetailsForm.setValue({
        categoryName: category.name,
        active: category.Active,
      });
    });
  }

  saveCategory() {
    // console.log(this.categoryDetailsForm.errors);

    this.testCategoryService
      .saveCategory(
        {
          name: this.categoryDetailsForm.get('categoryName')?.value,
          Active: Boolean(this.categoryDetailsForm.get('active')?.value),
        },
        this.categoryId
      )
      .then(() =>
        this.router.navigateByUrl('testcategory').catch((error) => {
          console.log(error);
        })
      )
      .catch((ex) => console.log(ex));
  }

  closeForm() {
    this.router.navigateByUrl('testcategory').catch((error) => {
      console.log(error);
    });
  }
}
