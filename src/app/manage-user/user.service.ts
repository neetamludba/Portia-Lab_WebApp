import { Injectable } from '@angular/core';
import { GetService, SaveService } from 'app/globals/api';
import { AppConst } from 'app/globals/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() { }

  async getAllUsers() {
    return GetService('user')
      .then((users) => {
        return users
      })
      .catch((ex) => console.log(ex));
  }

  async getAllUsersForAdmin(companyID: number) {
    return GetService('user/forAdmin/' + companyID)
      .then((users) => {
        return users
      })
      .catch((ex) => console.log(ex));
  }

  async getAllUsersForTeacher(companyID: number) {
    return GetService('user/forTeacher/' + companyID)
      .then((users) => {
        return users
      })
      .catch((ex) => console.log(ex));
  }

  async getAllActiveUsers() {
    return GetService('user/active')
      .then((users) => users)
      .catch((ex) => console.log(ex));
  }

  async getUser(userId: number) {
    return GetService('user/' + userId)
      .then((user) => user)
      .catch((ex) => console.log(ex));
  }

  async saveUser(userData: any, userId: number) {

    if (userId === 0) {
      return SaveService('user', {
        ...userData,
        companyID: AppConst.defaultCompanyId,
      })
        .then((userData) => {
          return userData;
        })
        .catch((ex) => {
          console.log(ex);
          return null;
        });
    } else
      return SaveService('user/' + userId, userData, AppConst.patchMethod)
        .then((count) => count)
        .catch((ex) => console.log(ex));
  }
}
