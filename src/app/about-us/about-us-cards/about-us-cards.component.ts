import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutUsService } from 'src/app/services/about-us.service';

import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-about-us-cards',
  templateUrl: './about-us-cards.component.html',
  styleUrls: ['./about-us-cards.component.css'],
})
export class AboutUsCardsComponent implements OnInit {
  public filters: any = {};
  public dialogType: string = 'add';
  public paginationValues: Subject<any> = new Subject();
  public recordLimit: number = 10;
  aboutUs: any = {};
  base_url = environment.url;
  loading: boolean = false;
  urls = [];
  files = [];
  type = 'add';
  err = false;
  @ViewChild('aboutUsImageFile') aboutUsImageFile: any;
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
      ['insert', ['table', 'hr']],
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
    private aboutUsService: AboutUsService
  ) {}

  ngOnInit() {
    this.aboutUs._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';
    if (this.aboutUs._id) {
      this.type = 'edit';
      this.getAboutUsCardsData();
    }
  }
  getAboutUsCardsData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.aboutUsService.getAboutUsCards(this.aboutUs._id).subscribe(
        (res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data) {
            this.aboutUs = res.data;
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

  onClickCancel() {
    this.router.navigate(['/aboutus/aboutUsCardManagement']);
  }
  onClickSave() {
    let params = {
      _id: this.aboutUs._id,
      cardDescription: this.aboutUs.cardDescription,
    };
    this.loading = true;
    this.aboutUsService.addAboutUsCards(params).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200 && res.data) {
          this._toastMessageService.alert(
            'success',
            'About Us added successfully.'
          );
          this.router.navigate(['/aboutus/aboutUsCardManagement']);
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
