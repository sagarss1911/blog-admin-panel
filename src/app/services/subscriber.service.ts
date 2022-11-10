import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
  private addSubscriberUrl = environment.url + '/api/subscriber/add_subscriber';
  private updateSubscriberUrl =
    environment.url + '/api/subscriber/update_subscriber/';
  private getAllSubscriberUrl =
    environment.url + '/api/subscriber/get_all_subscriber';
  private deleteSubscriberUrl =
    environment.url + '/api/subscriber/remove_subscriber/';
  private getSubscriberUrl = environment.url + '/api/subscriber/get_subscriber';

  // private addSubscriberUrl = environment.url + '/api/subscriber/add_subscriber';
  // private getSubscriberUrl = environment.url + '/api/subscriber/get_subscriber';

  constructor(private http: HttpClient) {}

  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }

  // addSubscriber(data: any) {
  //   return this.http.post(this.addSubscriberUrl, data, {
  //     headers: this.getHeader(),
  //   });
  // }

  // getSubscriber(data: any) {
  //   return this.http.post(this.getSubscriberUrl, data, {
  //     headers: this.getHeader(),
  //   });
  // }

  getSubscriber(data: any) {
    return this.http.post(this.getSubscriberUrl, data, {
      headers: this.getHeader(),
    });
  }
  addSubscriber(data: any) {
    return this.http.post(this.addSubscriberUrl, data, {
      headers: this.getHeader(),
    });
  }
  updateSubscriber(id, data) {
    return this.http.put(this.updateSubscriberUrl + id, data, {
      headers: this.getHeader(),
    });
  }
  getAllSubscriber(data: any) {
    return this.http.post(this.getAllSubscriberUrl, data, {
      headers: this.getHeader(),
    });
  }
  deleteSubscriber(id) {
    return this.http.delete(this.deleteSubscriberUrl + id, {
      headers: this.getHeader(),
    });
  }
}
