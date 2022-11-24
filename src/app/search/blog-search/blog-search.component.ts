import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { FeaturedPlaceComponent } from 'src/app/homepage/featured-place/featured-place.component';
import { blogsService } from 'src/app/services/blog.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-search',
  templateUrl: './blog-search.component.html',
  styleUrls: ['./blog-search.component.css'],
})
export class BlogSearchComponent implements OnInit {
  public loading: boolean = false;
  public recordLimit: number = 10;
  filters: any = {};
  public table_data: any[] = [];
  searchtext: any;
  base_url = environment.url;
  data: any = [];
  // searchtext: any;
  constructor(
    public blogservice: blogsService,
    private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper
  ) {}

  ngOnInit(): void {
    this.blogservice.headerClicked.subscribe(
      (searchtext: FeaturedPlaceComponent) => {
        this.filters.searchtext = searchtext;
      }
    );
  }

  search(form: any) {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        filters: {},
      };

      if (this.filters.searchtext) {
        params['filters']['searchtext'] = this.filters.searchtext;
      }
      this.blogservice.search(params).subscribe(
        (res: any) => {
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
