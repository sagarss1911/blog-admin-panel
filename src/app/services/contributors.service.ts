import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ContributorsService {
  private addContributors =
    environment.url + '/api/contributors/add_contributor';
  private getContributors =
    environment.url + '/api/contributors/get_contributors';

  constructor(private http: HttpClient) {}

  addContributor(data) {
    return this.http.post(this.addContributors, data);
  }
  getContributor() {
    return this.http.get(this.getContributors);
  }
}
