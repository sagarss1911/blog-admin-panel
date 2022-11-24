import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  private getAboutUsUrl = environment.url + '/api/about_us/get_about_us';
  private addAboutUsUrl = environment.url + '/api/about_us/add_about_us';
  private deleteAboutUsUrl = environment.url + '/api/about_us/delete_about_us/';
  private getAboutUsDetailUrl =
    environment.url + '/api/about_us/get_about_us_details';

  // cards
  private addAboutUsCardsUrl =
    environment.url + '/api/about_us/add_about_us_cards';
  private getAboutUsCardsUrl =
    environment.url + '/api/about_us/get_about_us_cards/';
  private deleteAboutUsCardUrl =
    environment.url + '/api/about_us/delete_about_us_cards/';
  private getAboutUsCardDetailUrl =
    environment.url + '/api/about_us/get_about_us_cards_details';
  constructor(private http: HttpClient) {}
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }
  getAboutUs() {
    return this.http.get(this.getAboutUsUrl, { headers: this.getHeader() });
  }
  getAboutUsDetails() {
    return this.http.get(this.getAboutUsDetailUrl, {
      headers: this.getHeader(),
    });
  }
  addAboutUs(params) {
    return this.http.post(this.addAboutUsUrl, params, {
      headers: this.getHeader(),
    });
  }
  deleteAboutUs(id) {
    return this.http.delete(this.deleteAboutUsUrl + id, {
      headers: this.getHeader(),
    });
  }

  //cards api
  deleteAboutUsCard(id) {
    return this.http.delete(this.deleteAboutUsCardUrl + id, {
      headers: this.getHeader(),
    });
  }

  getAboutUsCards(id) {
    return this.http.get(this.getAboutUsCardsUrl + id, {
      headers: this.getHeader(),
    });
  }
  getAboutUsCardDetail(params) {
    return this.http.post(this.getAboutUsCardDetailUrl, params, {
      headers: this.getHeader(),
    });
  }
  addAboutUsCards(params) {
    return this.http.post(this.addAboutUsCardsUrl, params, {
      headers: this.getHeader(),
    });
  }
}
