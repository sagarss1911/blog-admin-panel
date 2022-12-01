import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private addHeaderMainheadingUrl =
    environment.url + '/api/website_header/add_Header_headings';

  private addHeadersubheadingUrl =
    environment.url + '/api/website_header/add_Header_subHeading';

  private getAllMainHeaderUrl =
    environment.url + '/api/website_header/get_main_header';

  private getAllSubHeaderUrl =
    environment.url + '/api/website_header/get_sub_header';

  private deleteMainHeaderUrl =
    environment.url + '/api/website_header/delete_header/';

  private deleteSubHeaderUrl =
    environment.url + '/api/website_header/delete_sub_header/';

  private getMainHeaderUrl =
    environment.url + '/api/website_header/get_header/';

  private getSubHeaderUrl =
    environment.url + '/api/website_header/get_sub_header/';

  private getMainSubHeaderUrl =
    environment.url + '/api/website_header/get_main_header_sub';

  constructor(private http: HttpClient) {}

  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }
  //main headings
  addHeaderMainheading(params) {
    return this.http.post(this.addHeaderMainheadingUrl, params, {
      headers: this.getHeader(),
    });
  }

  getAllMainHeader(data: any) {
    return this.http.post(this.getAllMainHeaderUrl, data, {
      headers: this.getHeader(),
    });
  }
  getMainHeader(data) {
    return this.http.get(this.getMainHeaderUrl + data, {
      headers: this.getHeader(),
    });
  }

  deleteMainHeader(id) {
    return this.http.delete(this.deleteMainHeaderUrl + id, {
      headers: this.getHeader(),
    });
  }

  // getMainSubHeader() {
  //   return this.http.get(this.getMainSubHeaderUrl, {
  //     headers: this.getHeader(),
  //   });
  // }
  //sub headings
  addHeaderSubheading(params) {
    return this.http.post(this.addHeadersubheadingUrl, params, {
      headers: this.getHeader(),
    });
  }

  getAllSubHeader(data: any) {
    return this.http.post(this.getAllSubHeaderUrl, data, {
      headers: this.getHeader(),
    });
  }
  getSubHeader(data) {
    return this.http.get(this.getSubHeaderUrl + data, {
      headers: this.getHeader(),
    });
  }

  deleteSubHeader(id) {
    return this.http.delete(this.deleteSubHeaderUrl + id, {
      headers: this.getHeader(),
    });
  }
}
