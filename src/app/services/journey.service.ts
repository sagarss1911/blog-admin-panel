import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  private addJourneyIconUrl = environment.url + '/api/journey/add_journey_icon';

  private getAllJourneyIconUrl =
    environment.url + '/api/journey/get_all_journey_icon';
  private deleteJourneyIconUrl =
    environment.url + '/api/journey/delete_journey_icon/';

  private getJourneyIconByIdUrl =
    environment.url + '/api/journey/get_journey_icon_by_id/';

  //cards

  private addJourneyCardsUrl =
    environment.url + '/api/journey/add_journey_cards';
  private getJourneyCardsUrl =
    environment.url + '/api/journey/get_journey_cards/';
  private deleteJourneyCardUrl =
    environment.url + '/api/journey/delete_journey_cards/';
  private getJourneyCardDetailUrl =
    environment.url + '/api/journey/get_journey_cards_details';
  constructor(private http: HttpClient) {}
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }

  addJourneyIcon(data) {
    return this.http.post(this.addJourneyIconUrl, data, {
      headers: this.getHeader(),
    });
  }

  getAllJourneyIcon(data) {
    return this.http.post(this.getAllJourneyIconUrl, data, {
      headers: this.getHeader(),
    });
  }
  getJourneyIconById(id) {
    return this.http.get(this.getJourneyIconByIdUrl + id, {
      headers: this.getHeader(),
    });
  }
  deleteJourneyIcon(id) {
    return this.http.delete(this.deleteJourneyIconUrl + id, {
      headers: this.getHeader(),
    });
  }

  //cards

  deleteJourneyCard(id) {
    return this.http.delete(this.deleteJourneyCardUrl + id, {
      headers: this.getHeader(),
    });
  }

  getJourneyCards(id) {
    return this.http.get(this.getJourneyCardsUrl + id, {
      headers: this.getHeader(),
    });
  }
  getJourneyCardDetail(params) {
    return this.http.post(this.getJourneyCardDetailUrl, params, {
      headers: this.getHeader(),
    });
  }
  addJourneyCards(params) {
    return this.http.post(this.addJourneyCardsUrl, params, {
      headers: this.getHeader(),
    });
  }
}
