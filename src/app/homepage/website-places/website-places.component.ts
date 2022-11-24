import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { PlaceService } from 'src/app/services/place.service';
@Component({
  selector: 'app-website-places',
  templateUrl: './website-places.component.html',
  styleUrls: ['./website-places.component.css'],
})
export class WebsitePlacesComponent implements OnInit {
  public loading: boolean = false;
  public filters: any = {};
  public dialogType: string = 'add';
  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public feature: any;

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  base_url = environment.url;
  constructor(
    private placeService: PlaceService,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPlaceswithFilters({ page: 1 });
  }

  getPlaceswithFilters(event) {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        filters: {},
        page: event.page,
        limit: event.limit ? event.limit : this.recordLimit,
      };
      this.recordLimit = params.limit;
      if (this.filters.searchtext) {
        params['filters']['searchtext'] = this.filters.searchtext;
      }
      this.placeService.getAllPlace(params).subscribe(
        (res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data.places) {
            this.table_data = [];
            this.table_data = JSON.parse(JSON.stringify(res.data.places));
            this.paginationValues.next({
              type: 'page-init',
              page: params.page,
              totalTableRecords: res.data.total_count,
            });
          } else if (res.status == 400) {
            this._toastMessageService.alert('error', res.data.msg);
          }
          this.loading = false;
          return resolve(true);
        },
        (error) => {
          this.loading = false;
          this.commonHelper.showError(error);
          return resolve(false);
        }
      );
    });
  }
}
