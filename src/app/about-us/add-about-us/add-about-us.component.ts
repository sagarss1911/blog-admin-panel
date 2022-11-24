import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AboutUsService } from 'src/app/services/about-us.service';
@Component({
  selector: 'app-add-about-us',
  templateUrl: './add-about-us.component.html',
  styleUrls: ['./add-about-us.component.css'],
})
export class AddAboutUsComponent implements OnInit {
  aboutUs: any = {};
  base_url = environment.url;
  loading: boolean = false;
  urls = [];
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
  @ViewChild('aboutUsImageFile') aboutUsImageFile: any;
  public modalRef: BsModalRef;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _toastMessageService: ToastMessageService,
    private sanitizer: DomSanitizer,
    private commonHelper: CommonHelper,
    private aboutUsService: AboutUsService
  ) {}

  ngOnInit() {
    this.aboutUs._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';
    if (this.aboutUs._id) {
      this.type = 'edit';
      this.getAboutUsData();
    }
  }
  getAboutUsData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.aboutUsService.getAboutUs().subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.aboutUs = res.data;
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

  onImageUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.aboutUs.aboutUsImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.aboutUs.aboutUsImageFile = event.target.files[0];
    }
  }

  clearImageFile() {
    this.aboutUsImageFile.nativeElement.value = '';
    this.aboutUs.aboutUsImageUrl = '';
    this.aboutUs.aboutUsImageFile = null;
  }

  onClickCancel() {
    this.router.navigate(['/aboutus']);
  }
  onClickSave() {
    const data = new FormData();
    if (this.aboutUs.aboutUsImageFile) {
      data.append('image', this.aboutUs.aboutUsImageFile);
    }

    let params = {
      _id: this.aboutUs._id,
      mission: this.aboutUs.mission,
      files: this.files,
      aim: this.aboutUs.aim,

      firstTitle: this.aboutUs.firstTitle,
      firstDescription: this.aboutUs.firstDescription,
      contributorPara1: this.aboutUs.contributorPara1,
      contributorPara2: this.aboutUs.contributorPara2,
      secondTitle: this.aboutUs.secondTitle,
      firstColumn: this.aboutUs.firstColumn,
      secondColumn: this.aboutUs.secondColumn,
    };
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.aboutUsService.addAboutUs(data).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200 && res.data) {
          this._toastMessageService.alert(
            'success',
            'About Us added successfully.'
          );
          this.router.navigate(['/aboutus']);
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
