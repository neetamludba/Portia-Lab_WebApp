import { Injectable } from '@angular/core';
import { GetService, SaveService } from 'app/globals/api';

@Injectable({
  providedIn: 'root',
})
export class TestAttemptService {
  constructor() {}

  async getTestAttemptForAssignment(assignmentID: number) {
    return GetService('test-attempt/forassignment/' + assignmentID)
      .then((attemptDetail) => attemptDetail)
      .catch((ex) => {
        console.log(ex);
        throw ex;
      });
  }

  async getAllAttemptsForTest(testID: number) {
    return GetService('test-attempt/fortest/' + testID)
      .then((attemptDetail) => attemptDetail)
      .catch((ex) => {
        console.log(ex);
        throw ex;
      });
  }

  async saveTestAttempt(attemptData: any) {
    return SaveService('test-attempt', attemptData)
      .then((count) => count)
      .catch((ex) => {
        console.log(ex);
        throw ex;
      });
  }
}
