import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private addSubscriberUrl = environment.url + '/api/product/add_subscriber';
  private updateSubscriberUrl =
    environment.url + '/api/product/update_subscriber/';
  private getAllSubscriberUrl =
    environment.url + '/api/product/get_all_subscriber';
  private deleteSubscriberUrl =
    environment.url + '/api/product/remove_subscriber/';
  private getSubscriberUrl = environment.url + '/api/product/add_subscriber';

  ////////////////////////////////////////////////////////////////////////

  private addProductUrl = environment.url + '/api/product/add_product';
  private updateProductUrl = environment.url + '/api/product/update_product/';
  private getAllProductUrl = environment.url + '/api/product/get_all_product';
  private deleteProductUrl = environment.url + '/api/product/remove_product/';
  private getProductUrl = environment.url + '/api/product/add_product';

  constructor(private http: HttpClient) {}
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }

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

  ///////////////////////////////////////////////////////

  getProduct(data: any) {
    return this.http.post(this.getProductUrl, data, {
      headers: this.getHeader(),
    });
  }
  addProduct(data: any) {
    return this.http.post(this.addProductUrl, data, {
      headers: this.getHeader(),
    });
  }
  updateProduct(id, data) {
    return this.http.put(this.updateProductUrl + id, data, {
      headers: this.getHeader(),
    });
  }
  getAllProduct(data: any) {
    return this.http.post(this.getAllProductUrl, data, {
      headers: this.getHeader(),
    });
  }
  deleteProduct(id) {
    return this.http.delete(this.deleteProductUrl + id, {
      headers: this.getHeader(),
    });
  }
}
