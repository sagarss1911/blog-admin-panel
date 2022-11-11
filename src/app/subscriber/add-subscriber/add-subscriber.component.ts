import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex } from 'lodash-es';
import { SubscriberService } from 'src/app/services/subscriber.service';

@Component({
  selector: 'app-add-subscriber',
  templateUrl: './add-subscriber.component.html',
  styleUrls: ['./add-subscriber.component.css'],
})
export class AddSubscriberComponent implements OnInit {
  product: any = { colors: [] };
  base_url = environment.url;
  loading: boolean = false;
  collection_data = [];
  urls = [];
  already_uploadedurls = [];
  remaining_url = [];
  uploaded_files = [];
  category_data = [];
  color_data = [];
  thickness_data = [];
  length_data = [];
  files = [];
  material_data = [];
  type = 'add';
  imgclr = false;
  err = false;

  @ViewChild('CoverImageFile') CoverImageFile: any;
  @ViewChild('productImageFile') productImageFile: any;
  @ViewChild('productcolorImageFile') productcolorImageFile: any;
  public modalRef: BsModalRef;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subscriberService: SubscriberService,
    private _toastMessageService: ToastMessageService,
    private sanitizer: DomSanitizer,
    private commonHelper: CommonHelper
  ) {}

  ngOnInit() {
    this.product._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';
    if (this.product._id) {
      this.type = 'edit';
      this.getSubscriberData();
    }
  }
  getSubscriberData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.subscriberService.getSubscriber({ _id: this.product._id }).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.product = res.data;
            this.product.subscriberName = res.data.subscriberName;
            this.product.shortDescription = res.data.shortDescription;
            this.product.location = res.data.location;
            this.product.website = res.data.website;
            this.product.facebookLink = res.data.facebookLink;
            this.product.twitterLink = res.data.twitterLink;
            this.already_uploadedurls = res.data.option_images
              ? res.data.option_images
              : [];
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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.files.push({ file: event.target.files[i], type: 'optional' });
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.urls.push({ url: event.target.result });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
      this.err = false;
    }
  }
  clearOptionalFile(i) {
    this.files[i].isdelete = 1;
    this.urls[i].isdelete = 1;
    let a = this.urls.filter((fl) => {
      return !fl.isdelete;
    });
    if (a.length > 0) {
      this.err = true;
    }
  }

  clearAlreadyUploadedFile(image) {
    let findI = findIndex(this.already_uploadedurls, (v) => {
      return v.baseimage == image;
    });
    if (findI != -1) {
      this.already_uploadedurls[findI].isdelete = 1;
    }
    this.remaining_url = this.already_uploadedurls
      .filter((fl) => {
        return !fl.isdelete;
      })
      .map((a) => {
        return a.baseimage;
      });
  }

  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.product.productImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.product.productImageFile = event.target.files[0];
      this.product.newImageUploaded = true;
    }
  }

  onCoverCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.product.CoverImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.product.CoverImageFile = event.target.files[0];
      this.product.newcoverImageUploaded = true;
    }
  }
  clearCoverCLFile() {
    this.CoverImageFile.nativeElement.value = '';
    this.product.CoverImageUrl = '';
    this.product.CoverImageFile = null;
    this.product.newcoverImageUploaded = false;
  }

  clearCLFile() {
    this.productImageFile.nativeElement.value = '';
    this.product.productImageUrl = '';
    this.product.productImageFile = null;
    this.product.newImageUploaded = false;
  }

  onClickCancel() {
    this.router.navigate(['/subscriber']);
  }
  onClickSave() {
    this.remaining_url = this.already_uploadedurls
      .filter((fl) => {
        return !fl.isdelete;
      })
      .map((a) => {
        return a.baseimage;
      });
    this.uploaded_files = [];

    const data = new FormData();
    this.uploaded_files = [];
    if (this.product.productImageFile) {
      data.append('profileImage', this.product.productImageFile);
      this.uploaded_files.push({
        imageactualname: this.product.productImageFile.name,
        type: 'profileImage',
      });
    }

    if (this.product.CoverImageFile) {
      data.append('coverImage', this.product.CoverImageFile);
      this.uploaded_files.push({
        imageactualname: this.product.CoverImageFile.name,
        type: 'coverImage',
      });
    }

    let params = {
      _id: this.product._id,
      subscriberName: this.product.subscriberName,
      newImageUploaded: this.product.newImageUploaded,
      files: this.files,
      password: this.product.password,
      shortDescription: this.product.shortDescription,
      location: this.product.location,
      website: this.product.website,
      facebookLink: this.product.facebookLink,
      twitterLink: this.product.twitterLink,
      uploaded_files: this.uploaded_files,
      remaining_url: this.remaining_url,
    };

    data.append('body', JSON.stringify(params));

    this.loading = true;
    this.subscriberService.addSubscriber(data).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200 && res.data) {
          this._toastMessageService.alert(
            'success',
            'Registered successfully.'
          );
          this.router.navigate(['/subscriber']);
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
