import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private addIconUrl = environment.url + '/api/change_icon/add_icon';

  private getIconUrl = environment.url + '/api/change_icon/get_icon';

  private getIconByIdUrl = environment.url + '/api/change_icon/get_icon_by_id/';

  private getAllImagesUrl = environment.url + '/api/change_icon/get_all_icons';

  constructor(private http: HttpClient) {}

  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    return headers;
  }
  addIcon(data: any) {
    return this.http.post(this.addIconUrl, data, {
      headers: this.getHeader(),
    });
  }

  getIcon() {
    return this.http.get(this.getIconUrl, {
      headers: this.getHeader(),
    });
  }

  getIconById(id) {
    return this.http.get(this.getIconByIdUrl + id, {
      headers: this.getHeader(),
    });
  }

  getAllImages() {
    return this.http.post(this.getAllImagesUrl, {
      headers: this.getHeader(),
    });
  }
}
