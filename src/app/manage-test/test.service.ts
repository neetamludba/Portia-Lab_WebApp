import { Injectable } from '@angular/core';
import { GetService, SaveService } from 'app/globals/api';
import { AppConst } from 'app/globals/constants';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  async getAllTests() {
    return GetService('test')
      .then((tests) => tests)
      .catch((ex) => console.log(ex));
  }

  async getTest(testId: number) {
    return GetService('test/' + testId)
      .then((test) => test)
      .catch((ex) => console.log(ex));
  }

  async saveTest(testData: any, testId: number) {
    if (testId === 0) {
      return SaveService('test', {
        ...testData,
        companyID: AppConst.defaultCompanyId,
      })
        .then((count) => count)
        .catch((ex) => console.log(ex));
    } else
      return SaveService('test/' + testId, testData, AppConst.patchMethod)
        .then((count) => count)
        .catch((ex) => console.log(ex));
  }
}
