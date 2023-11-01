import { Injectable } from '@angular/core';
import { GetService, SaveService } from 'app/globals/api';

@Injectable({
  providedIn: 'root',
})
export class TestAssignmentService {
  async getAssignment(assignmentIID: number) {
    return GetService('test-assignment/' + assignmentIID)
      .then((assignment) => assignment)
      .catch((ex) => console.log(ex));
  }

  async getTest(testID: number) {
    return GetService('test/' + testID)
      .then((test) => test)
      .catch((ex) => console.log(ex));
  }

  async getAllAssignmentsForTest(testID: number) {
    return GetService('test-assignment/fortest/' + testID)
      .then((assignments) => assignments)
      .catch((ex) => console.log(ex));
  }

  async addAssignment(assignment: any) {
    return SaveService('test-assignment', assignment)
      .then((count) => count)
      .catch((ex) => console.log(ex));
  }

  async getAllAssignmentsForUser(userID: number) {
    return GetService('test-assignment/forUser/' + userID)
      .then((assignments) => assignments)
      .catch((ex) => console.log(ex));
  }
}
