import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private getAllLinksUrl =
    environment.url + '/api/website_footer/get_footer_links';
  private addWebsiteLinksUrl =
    environment.url + '/api/website_footer/add_footer_links';
  private deleteLinksUrl =
    environment.url + '/api/website_footer/delete_footer_link/';
  private getLinkDetailsUrl =
    environment.url + '/api/website_footer/get_footer_links_details/';

  //footer headings
  private getAllfooterHeadingUrl =
    environment.url + '/api/website_footer/get_footer_headings';
  private addWebsitefooterHeadingUrl =
    environment.url + '/api/website_footer/add_footer_headings';
  private deletefooterHeadingUrl =
    environment.url + '/api/website_footer/delete_footer_heading/';
  private getHeadingDetailsUrl =
    environment.url + '/api/website_footer/get_footer_headings_details/';
  constructor(private http: HttpClient) {}
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }
  getAllLinks(data: any) {
    return this.http.post(this.getAllLinksUrl, data, {
      headers: this.getHeader(),
    });
  }
  getLinkDetails(data) {
    return this.http.get(this.getLinkDetailsUrl + data, {
      headers: this.getHeader(),
    });
  }
  addWebsiteLinks(params) {
    return this.http.post(this.addWebsiteLinksUrl, params, {
      headers: this.getHeader(),
    });
  }
  deleteLinks(id) {
    return this.http.delete(this.deleteLinksUrl + id, {
      headers: this.getHeader(),
    });
  }

  //footer headings
  getAllfooterHeading(data: any) {
    return this.http.post(this.getAllfooterHeadingUrl, data, {
      headers: this.getHeader(),
    });
  }
  getHeadingDetails(data) {
    return this.http.get(this.getHeadingDetailsUrl + data, {
      headers: this.getHeader(),
    });
  }
  addWebsitefooterHeading(params) {
    return this.http.post(this.addWebsitefooterHeadingUrl, params, {
      headers: this.getHeader(),
    });
  }
  deletefooterHeading(id) {
    return this.http.delete(this.deletefooterHeadingUrl + id, {
      headers: this.getHeader(),
    });
  }
}
