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
  subscriber: any = { colors: [] };
  base_url = environment.url;
  loading: boolean = false;
  urls = [];
  already_uploadedurls = [];
  remaining_url = [];
  uploaded_files = [];
  files = [];
  type = 'add';
  imgclr = false;
  err = false;

  @ViewChild('CoverImageFile') CoverImageFile: any;
  @ViewChild('subscriberImageFile') subscriberImageFile: any;
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
    this.subscriber._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';
    if (this.subscriber._id) {
      this.type = 'edit';
      this.getSubscriberData();
    }
  }

  //Get subscriber by _id
  getSubscriberData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.subscriberService.getSubscriber(this.subscriber._id).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.subscriber = res.data;
            this.subscriber.subscriberName = res.data.subscriberName;
            this.subscriber.shortDescription = res.data.shortDescription;
            this.subscriber.location = res.data.location;
            this.subscriber.website = res.data.website;
            this.subscriber.facebookLink = res.data.facebookLink;
            this.subscriber.twitterLink = res.data.twitterLink;
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
      this.subscriber.subscriberImageUrl =
        this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(event.target.files[0])
        );
      this.subscriber.subscriberImageFile = event.target.files[0];
      this.subscriber.newImageUploaded = true;
    }
  }

  onCoverCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.subscriber.CoverImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.subscriber.CoverImageFile = event.target.files[0];
      this.subscriber.newcoverImageUploaded = true;
    }
  }
  clearCoverCLFile() {
    this.CoverImageFile.nativeElement.value = '';
    this.subscriber.CoverImageUrl = '';
    this.subscriber.CoverImageFile = null;
    this.subscriber.newcoverImageUploaded = false;
  }

  clearCLFile() {
    this.subscriberImageFile.nativeElement.value = '';
    this.subscriber.subscriberImageUrl = '';
    this.subscriber.subscriberImageFile = null;
    this.subscriber.newImageUploaded = false;
  }

  onClickCancel() {
    this.router.navigate(['/subscriber']);
  }

  //Add new subscriber
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
    if (this.subscriber.subscriberImageFile) {
      data.append('profileImage', this.subscriber.subscriberImageFile);
      this.uploaded_files.push({
        imageactualname: this.subscriber.subscriberImageFile.name,
        type: 'profileImage',
      });
    }

    if (this.subscriber.CoverImageFile) {
      data.append('coverImage', this.subscriber.CoverImageFile);
      this.uploaded_files.push({
        imageactualname: this.subscriber.CoverImageFile.name,
        type: 'coverImage',
      });
    }

    let params = {
      _id: this.subscriber._id,
      subscriberName: this.subscriber.subscriberName,
      newImageUploaded: this.subscriber.newImageUploaded,
      files: this.files,
      password: this.subscriber.password,
      shortDescription: this.subscriber.shortDescription,
      location: this.subscriber.location,
      website: this.subscriber.website,
      facebookLink: this.subscriber.facebookLink,
      twitterLink: this.subscriber.twitterLink,
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
            'Subscriber Registered Successfully.'
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
