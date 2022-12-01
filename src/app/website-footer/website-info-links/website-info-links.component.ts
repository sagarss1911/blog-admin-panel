import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';

import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from 'src/environments/environment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FooterService } from 'src/app/services/footer.service';
@Component({
  selector: 'app-website-info-links',
  templateUrl: './website-info-links.component.html',
  styleUrls: ['./website-info-links.component.css'],
})
export class WebsiteInfoLinksComponent implements OnInit {
  website: any = [];
  base_url = environment.url;
  loading: boolean = false;
  urls = [];
  already_uploadedurls = [];
  remaining_url = [];
  uploaded_files = [];
  website_data: any;
  files = [];
  type = 'add';
  imgclr = false;
  err = false;
  parentCategory: any;
  public modalRef: BsModalRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private commonHelper: CommonHelper,
    private FooterService: FooterService
  ) {}
  ngOnInit() {
    this.website._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';
    if (this.website._id) {
      this.type = 'edit';

      this.getWebsiteLinks();
    }

    this.getAllLinks();
  }

  // Get website by _id
  getWebsiteLinks() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.FooterService.getLinkDetails(this.website._id).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.website = [];
            this.website = res.data[0];
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

  //Get complete list of  website
  getAllLinks() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        page: 1,
        limit: 100,
      };
      this.FooterService.getAllLinks(params).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.website_data = [];
            this.website_data = res.data.websiteData;
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

  onClickCancel() {
    this.router.navigate(['/websitefooter/websiteLinks']);
  }

  //Add Category
  onClickSave() {
    let data = {
      _id: this.website._id,
      linkName: this.website.linkName,
      link: this.website.link,
    };

    this.loading = true;
    this.FooterService.addWebsiteLinks(data).subscribe(
      (res: any) => {
        this.website_data = res.data.websitedata;

        this.loading = false;
        if (res.status == 200 && res.data) {
          this._toastMessageService.alert(
            'success',
            'website added successfully.'
          );
          this.router.navigate(['/websitefooter/websiteLinks']);
        }
      },
      (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
      }
    );

    this.loading = false;
  }
}
