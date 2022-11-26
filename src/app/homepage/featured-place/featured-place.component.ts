import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';

import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Router } from '@angular/router';
import { PlaceService } from 'src/app/services/place.service';
import { blogsService } from 'src/app/services/blog.service';
@Component({
  selector: 'app-featured-place',
  templateUrl: './featured-place.component.html',
  styleUrls: ['./featured-place.component.css'],
})
export class FeaturedPlaceComponent implements OnInit {
  public places: any = [];
  public modalRef: BsModalRef;
  base_url = environment.url;
  data: any = [];
  blogData: any = [];
  bookmark: any = [];

  res: any = false;
  Category: any;
  constructor(
    public placeService: PlaceService,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private router: Router,
    private blogservice: blogsService
  ) {}
  public loading: boolean = false;
  public recordLimit: number = 10;
  public filters: any = {};
  public table_data: any[] = [];
  public table_data1: any[] = [];
  // public data: any[] = [];
  storeBookmark: any[] = [];
  favblog: any[] = [];
  liked: any;
  clicked: boolean = false;
  ngOnInit(): void {
    this.getAllData();
    this.getAllFav();
    this.getAllBookmark();
    this.placeService.getAllFeaturedPlace().subscribe(
      (res: any) => {
        if (res.status == 200 && res.data.places) {
          this.places = [];
          this.places = JSON.parse(JSON.stringify(res.data.places));
        } else if (res.status == 400) {
          this._toastMessageService.alert('error', res.data.msg);
        }
        // return resolve(true);
      },
      (error) => {
        this.commonHelper.showError(error);
        // return resolve(false);
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
        userId: localStorage.getItem('user_id'),
      };
      this.recordLimit = params.limit;
      if (this.filters.searchtext) {
        params['filters']['searchtext'] = this.filters.searchtext;
      }
      this.blogservice.getAllBlogs(params).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data.slides) {
            this.table_data = [];

            this.table_data = JSON.parse(JSON.stringify(res.data.slides));

            this.liked = JSON.parse(JSON.stringify(res.data.mainBlog));

            this.table_data.forEach((element) => {
              this.storeBookmark = [];

              this.storeBookmark = element.bookmark;
              this.storeBookmark.forEach((ele) => {
                if (ele.blogId == element._id) {
                  element.bookmark = false;
                }
              });

              this.favblog = [];

              this.favblog = element.favBlog;
              this.favblog.forEach((ele) => {
                if (ele.blogId == element._id) {
                  element.clicked = true;
                }
              });
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
  clickeds(item) {
    let items = {
      blogId: item._id,
      userId: localStorage.getItem('user_id'),
    };
    this.blogservice.addToFav(items).subscribe((res: any) => {
      if (res.data == 'added') {
        item.clicked = true;
      } else if (res.data == 'removed') {
        item.clicked = false;
      }
    });
  }
  bookCheck(item) {
    this.storeBookmark = [];

    let items = {
      blogId: item._id,
      userId: localStorage.getItem('user_id'),
    };
    this.blogservice.addbookMark(items).subscribe((res: any) => {
      this.getAllData();
      if (res.data == 'added') {
        item.bookmark = true;
      } else if (res.data == 'removed') {
        item.bookmark = false;
      }
    });
  }

  category(item) {
    this.blogservice.headerClicked.next(item);
    this.router.navigate(['/search']);
  }

  getAllFav() {
    let id = localStorage.getItem('user_id');
    this.blogservice.getFav(id).subscribe((res: any) => {
      this.data = JSON.parse(JSON.stringify(res.data.slides));
      console.log(this.data, 'fav');
    });
  }

  getAllBookmark() {
    let id = localStorage.getItem('user_id');
    this.blogservice.getBookMark(id).subscribe((res: any) => {
      this.bookmark = JSON.parse(JSON.stringify(res.data.slider));
      console.log(this.bookmark, 'bookmark');
    });
  }
}
