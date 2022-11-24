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
  private getPlaceUrl = environment.url + '/api/place/get_place/';
  private addPlaceFeatureUrl =
    environment.url + '/api/place/add_featured_places';

  private getAllFeaturedPlaceUrl =
    environment.url + '/api/place/get_featured_places';
  constructor(private http: HttpClient) {}
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }

  getPlace(id) {
    return this.http.get(this.getPlaceUrl + id, {
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
  addToFeature(data: any) {
    console.log(data);
    return this.http.put(this.addPlaceFeatureUrl, data, {
      headers: this.getHeader(),
    });
  }

  getAllFeaturedPlace() {
    return this.http.get(this.getAllFeaturedPlaceUrl, {
      headers: this.getHeader(),
    });
  }
}
