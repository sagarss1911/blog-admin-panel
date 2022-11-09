import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private addPlaceUrl = environment.url + '/api/place/add_places';
  private getAllPlaceUrl = environment.url + '/api/place/get_all_place';
  private deletePlaceUrl = environment.url + '/api/place/remove_place/';
  private getPlaceUrl = environment.url + '/api/place/get_place';
  constructor(private http: HttpClient) {}
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }

  getPlace(data) {
    console.log(data, 'service');

    return this.http.post(this.getPlaceUrl, data, {
      headers: this.getHeader(),
    });
  }

  addPlace(data) {
    return this.http.post(this.addPlaceUrl, data, {
      headers: this.getHeader(),
    });
  }

  getAllPlace(data) {
    return this.http.post(this.getAllPlaceUrl, data, {
      headers: this.getHeader(),
    });
  }
  deletePlace(id) {
    return this.http.delete(this.deletePlaceUrl + id, {
      headers: this.getHeader(),
    });
  }
}
