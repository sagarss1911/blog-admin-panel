import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  private addUserUrl = environment.url + '/api/admin-user/add-user';
  private getUserListUrl = environment.url + '/api/admin-user/get-users-list';
  private deleteUserUrl = environment.url + '/api/admin-user/delete-user/';
  private updateUserUrl = environment.url + '/api/admin-user/edit-user/';
  constructor(private http: HttpClient) {}

  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }

  addUser(data) {
    return this.http.post(this.addUserUrl, data, { headers: this.getHeader() });
  }

  getUserData(data) {
    return this.http.post(this.getUserListUrl, data, {
      headers: this.getHeader(),
    });
  }

  updateUser(id, data) {
    return this.http.put(this.updateUserUrl + id, data, {
      headers: this.getHeader(),
    });
  }

  deleteUser(id) {
    return this.http.delete(this.deleteUserUrl + id, {
      headers: this.getHeader(),
    });
  }
}
