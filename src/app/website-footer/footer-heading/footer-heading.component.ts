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
  selector: 'app-footer-heading',
  templateUrl: './footer-heading.component.html',
  styleUrls: ['./footer-heading.component.css'],
})
export class FooterHeadingComponent implements OnInit {
  footerHeading: any = [];
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
    private FooterService: FooterService
  ) {}
  ngOnInit() {
    this.footerHeading._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';
    if (this.footerHeading._id) {
      this.type = 'edit';

      this.getWebsitefooterHeading();
    }

    this.getAllfooterHeading();
  }

  // Get footerHeading by _id
  getWebsitefooterHeading() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.FooterService.getHeadingDetails(this.footerHeading._id).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.footerHeading = [];
            this.footerHeading = res.data[0];
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
  getAllfooterHeading() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        page: 1,
        limit: 100,
      };
      this.FooterService.getAllfooterHeading(params).subscribe(
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
    this.router.navigate(['/websitefooter/footer-Headings']);
  }

  //Add Category
  onClickSave() {
    let data = {
      _id: this.footerHeading._id,
      explore: this.footerHeading.explore,
      exploreDescription: this.footerHeading.exploreDescription,
      community: this.footerHeading.community,
      communityDescription: this.footerHeading.communityDescription,
      about: this.footerHeading.about,
      aboutDescription: this.footerHeading.aboutDescription,
      store: this.footerHeading.store,
      storeDescription: this.footerHeading.storeDescription,
      follow: this.footerHeading.follow,
    };

    this.loading = true;
    this.FooterService.addWebsitefooterHeading(data).subscribe(
      (res: any) => {
        this.website_data = res.data.websitedata;

        this.loading = false;
        if (res.status == 200 && res.data) {
          this._toastMessageService.alert(
            'success',
            'Heading added successfully.'
          );
          this.router.navigate(['/websitefooter/footer-Headings']);
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
