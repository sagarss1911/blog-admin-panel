import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';

import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from 'src/environments/environment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-main-heading',
  templateUrl: './main-heading.component.html',
  styleUrls: ['./main-heading.component.css'],
})
export class MainHeadingComponent implements OnInit {
  mainHeading: any = [];
  base_url = environment.url;
  loading: boolean = false;
  _id: any;
  website_data: any;
  website: any = [];
  files = [];
  type = 'add';
  err = false;
  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontsize']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'hr', 'link']],
    ],
    fontNames: [
      'Helvetica',
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'Roboto',
      'Times',
    ],
  };
  public modalRef: BsModalRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper,
    private HeaderService: HeaderService
  ) {}
  ngOnInit() {
    this.mainHeading._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';
    if (this.mainHeading._id) {
      this.type = 'edit';

      this.getWebsiteHeaderHeading();
    }

    // this.getAllMainHeading();
  }

  // Get footerHeading by _id
  getWebsiteHeaderHeading() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.HeaderService.getMainHeader(this.mainHeading._id).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.mainHeading = [];
            this.mainHeading = res.data[0];
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
  getAllMainHeading() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        page: 1,
        limit: 100,
      };
      this.HeaderService.getAllMainHeader(params).subscribe(
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
    this.router.navigate(['/websiteheader/header-HeadingManagement']);
  }

  //Add Category
  onClickSave() {
    let data = {
      _id: this.mainHeading._id,
      heading: this.mainHeading.heading,
    };

    this.loading = true;
    this.HeaderService.addHeaderMainheading(data).subscribe(
      (res: any) => {
        this.website_data = res.data.websitedata;

        this.loading = false;
        if (res.status == 200 && res.data) {
          this._toastMessageService.alert(
            'success',
            'Heading added successfully.'
          );
          this.router.navigate(['/websiteheader/header-HeadingManagement']);
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
