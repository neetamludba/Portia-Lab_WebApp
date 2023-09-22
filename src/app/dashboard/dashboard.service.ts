import { Injectable } from '@angular/core';
import { GetService } from 'app/globals/api';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  async getAdminData() {
    return GetService('dashboard/admin')
      .then((data) => data)
      .catch((ex) => console.log(ex));
  }

  async getUserData(userId: number) {
    return GetService('dashboard/user/' + userId)
      .then((data) => data)
      .catch((ex) => console.log(ex));
  }

  async getCategoryWiseUsersScoreForAdmin() {
    return GetService('dashboard/categorywisescores/foradmin')
      .then((data) => data)
      .catch((ex) => console.log(ex));
  }

  async getCategoryWiseUserScore(userId: number) {
    return GetService('dashboard/categorywiseuserscores/' + userId)
      .then((data) => data)
      .catch((ex) => console.log(ex));
  }

  async getTestWiseUserScoresForAdmin() {
    return GetService('dashboard/testwisescores/foradmin')
      .then((data) => data)
      .catch((ex) => console.log(ex));
  }

  async getTestWiseUserScoresForUser(userId: number) {
    return GetService('dashboard/testwiseuserscores/' + userId)
      .then((data) => data)
      .catch((ex) => console.log(ex));
  }
}
