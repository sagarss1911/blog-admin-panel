import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { blogsService } from 'src/app/services/blog.service';
// import { ToastMessageService } from 'src/app/services/toast-message.service';
// import { Component, OnInit, ViewChild } from '@angular/core';
// import { CommonHelper } from 'src/app/helpers/common.helper';
// import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { PlaceService } from 'src/app/services/place.service';
// import { Router } from '@angular/router';
// import { blogsService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-future-blogs',
  templateUrl: './future-blogs.component.html',
  styleUrls: ['./future-blogs.component.css'],
})
export class FutureBlogsComponent implements OnInit {
  constructor(
    private commonHelper: CommonHelper,
    private placeService: PlaceService,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private router: Router,
    private blogservice: blogsService
  ) {}
  public loading: boolean = false;
  public recordLimit: number = 10;
  public filters: any = {};
  public table_data: any[] = [];

  public slider_obj: any = {};
  public dialogType: string = 'add';
  public paginationValues: Subject<any> = new Subject();
  places: any;
  public modalRef: BsModalRef;
  base_url = environment.url;
  featured: string;
  ngOnInit(): void {
    this.getAllData();
    this.getplaces();
  }

  getplaces() {
    this.placeService.getAllFeaturedPlace().subscribe(
      (res: any) => {
        if (res.status == 200 && res.data.places) {
          this.places = [];
          this.places = JSON.parse(JSON.stringify(res.data.places));
        } else if (res.status == 400) {
          this._toastMessageService.alert('error', res.data.msg);
        }
      },
      (error) => {
        this.commonHelper.showError(error);
      }
    );
  }
  getAllData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        filters: {},
        page: 1,
        limit: this.recordLimit,
      };
      this.recordLimit = params.limit;
      if (this.filters.searchtext) {
        params['filters']['searchtext'] = this.filters.searchtext;
      }
      this.blogservice.getAllBlogs(params).subscribe(
        (res: any) => {
          // console.log(res);

          if (res.status == 200 && res.data.slides) {
            this.table_data = [];

            this.table_data = JSON.parse(JSON.stringify(res.data.slides));
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
