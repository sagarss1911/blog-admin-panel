import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class blogsService {
  headerClicked = new BehaviorSubject<any>('');
  private addProductUrl = environment.url + '/api/blogs/add_blog';

  private updateProductUrl = environment.url + '/api/blogs/update_blog/';
  private getAllProductUrl = environment.url + '/api/blogs/get_all_blog';
  private deleteProductUrl = environment.url + '/api/blogs/remove_blog/';
  private getProductUrl = environment.url + '/api/blogs/get_blog/';
  private addToFave = environment.url + '/api/blogs/add_fav';
  private addbookMarkUrl = environment.url + '/api/blogs/add_bookMark';
  private getFavUrl = environment.url + '/api/blogs/get_all_favBlogs/';
  private getBookMarkUrl = environment.url + '/api/blogs/get_all_bookMark/';
  private searchUrl = environment.url + '/api/blogs/search';
  constructor(private http: HttpClient) {}
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }

  getBlog(id) {
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
    return this.http.delete(this.deleteProductUrl + id, {
      headers: this.getHeader(),
    });
  }

  addToFav(data) {
    return this.http.post(this.addToFave, data, {
      headers: this.getHeader(),
    });
  }
  addbookMark(data) {
    return this.http.post(this.addbookMarkUrl, data, {
      headers: this.getHeader(),
    });
  }

  getFav(id) {
    return this.http.get(this.getFavUrl + id, {
      headers: this.getHeader(),
    });
  }

  getBookMark(id) {
    return this.http.get(this.getBookMarkUrl + id, {
      headers: this.getHeader(),
    });
  }

  search(data) {
    return this.http.post(this.searchUrl, data, {
      headers: this.getHeader(),
    });
  }
}
