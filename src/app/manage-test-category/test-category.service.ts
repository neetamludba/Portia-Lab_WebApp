import { Injectable } from '@angular/core';
import { GetService, SaveService } from 'app/globals/api';
import { AppConst } from 'app/globals/constants';

@Injectable({
  providedIn: 'root',
})
export class TestCategoryService {
  constructor() {}

  async getAllCategories() {
    return GetService('test-category')
      .then((categories) => categories)
      .catch((ex) => console.log(ex));
  }

  async getCategory(categoryId: number) {
    return GetService('test-category/' + categoryId)
      .then((category) => category)
      .catch((ex) => console.log(ex));
  }

  async saveCategory(categoryData: any, categoryId: number) {

    if (categoryId === 0) {
      return SaveService('test-category', {
        ...categoryData,
        companyID: AppConst.defaultCompanyId,
      })
        .then((count) => count)
        .catch((ex) => console.log(ex));
    } else
      return SaveService(
        'test-category/' + categoryId,
        categoryData,
        AppConst.patchMethod
      )
        .then((count) => count)
        .catch((ex) => console.log(ex));
  }
}
