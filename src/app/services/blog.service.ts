import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class blogsService {
  private addProductUrl = environment.url + '/api/blogs/add_blog';
  // private addProductUrl = environment.url + '/api/blog/add_blog';
  private updateProductUrl = environment.url + '/api/blogs/update_blog/';
  private getAllProductUrl = environment.url + '/api/blogs/get_all_blog';
  private deleteProductUrl = environment.url + '/api/blogs/remove_blog/';
  private getProductUrl = environment.url + '/api/blogs/get_blog';
  // private getProductUrl = environment.url + '/api/blogs/add_product';

  // private getAboutUsUrl = environment.url + '/api/about_us/get_about_us';
  // private addAboutUsUrl = environment.url + '/api/about_us/add_about_us';

  constructor(private http: HttpClient) {}
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }

  getBlog(data) {
    return this.http.post(this.getProductUrl, data, {
      headers: this.getHeader(),
    });
  }
  addBlogs(data) {
    return this.http.post(this.addProductUrl, data, {
      headers: this.getHeader(),
    });
  }

  updateBlogs(id, data) {
    return this.http.put(this.updateProductUrl + id, data, {
      headers: this.getHeader(),
    });
  }
  getAllBlogs(data) {
    return this.http.post(this.getAllProductUrl, data, {
      headers: this.getHeader(),
    });
  }
  deleteBlogs(id) {
    return this.http.delete(this.deleteProductUrl + id, {
      headers: this.getHeader(),
    });
  }
}
