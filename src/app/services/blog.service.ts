import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class blogsService {
  private addProductUrl = environment.url + '/api/blogs/add_blog';

  private updateProductUrl = environment.url + '/api/blogs/update_blog/';
  private getAllProductUrl = environment.url + '/api/blogs/get_all_blog';
  private deleteProductUrl = environment.url + '/api/blogs/remove_blog/';
  private getProductUrl = environment.url + '/api/blogs/get_blog/';

  constructor(private http: HttpClient) {}
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }

  getBlog(id) {
    console.log(this.getProductUrl + id);

    return this.http.get(this.getProductUrl + id, {
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
    console.log(this.deleteProductUrl + id);
    return this.http.delete(this.deleteProductUrl + id, {
      headers: this.getHeader(),
    });
  }
}
