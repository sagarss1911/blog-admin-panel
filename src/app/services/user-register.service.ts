import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserRegisterService {
  private userRegisterUrl = environment.url + '/api/user_register/add_user';
  private updateUserUrl = environment.url + '/api/user_register/update_user';
  private getUserUrl = environment.url + '/api/user_register/get_user/';
  private getAllUserUrl = environment.url + '/api/user_register/get_all_user';
  private updatePasswordUrl =
    environment.url + '/api/user_register/update_password';
  private deleteUserUrl = environment.url + '/api/user_register/remove_user/';

  private getAllContactUsUserUrl =
    environment.url + '/api/user_register/get_all_contactususer';
  constructor(private http: HttpClient) {}

  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }

  userRegister(data: any) {
    return this.http.post(this.userRegisterUrl, data, {
      headers: this.getHeader(),
    });
  }
  updateUser(data) {
    return this.http.post(this.updateUserUrl, data, {
      headers: this.getHeader(),
    });
  }

  getUser(id) {
    return this.http.get(this.getUserUrl + id, {
      headers: this.getHeader(),
    });
  }

  getAllUser(data) {
    return this.http.post(this.getAllUserUrl, {
      headers: this.getHeader(),
    });
  }

  updatePassword(data) {
    return this.http.post(this.updatePasswordUrl, data, {
      headers: this.getHeader(),
    });
  }

  deleteUser(id) {
    return this.http.delete(this.deleteUserUrl + id, {
      headers: this.getHeader(),
    });
  }

  //user-contact-us
  getContactUsDetail(data) {
    return this.http.post(this.getAllContactUsUserUrl, data, {
      headers: this.getHeader(),
    });
  }

  saveAuthData(token: string, user_id: any) {
    localStorage.setItem(`token`, token);
    localStorage.setItem(`user_id`, user_id);
  }
}
