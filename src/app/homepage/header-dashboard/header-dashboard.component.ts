import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.css'],
})
export class HeaderDashboardComponent implements OnInit {
  base_url = environment.url;
  urls = [];
  files = [];
  type = 'add';
  err = false;
  icon: any = {};
  public table_data: any[] = [];
  data: any;
  public loading: boolean = false;
  public filters: any = {};
  public dialogType: string = 'add';
  public paginationValues: Subject<any> = new Subject();
  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  params: any;

  @ViewChild('ImageFile') ImageFile: any;
  @ViewChild('logoImageFile') logoImageFile: any;
  // public modalRef: BsModalRef;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _toastMessageService: ToastMessageService,
    private sanitizer: DomSanitizer,
    private commonHelper: CommonHelper,
    private imageUploadService: ImageUploadService
  ) {}

  ngOnInit(): void {
    this.getLogoIcon();
    this.icon._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';
    if (this.icon._id) {
      this.type = 'edit';
      this.getIconData();
    }
  }

  getIconData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.imageUploadService.getIcon().subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.icon = res.data;
            console.log(res.data, this.icon);
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

  getLogoIcon() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.imageUploadService.getAllImages().subscribe(
        (res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data.subscriberList) {
            this.table_data = [];
            this.table_data = JSON.parse(
              JSON.stringify(res.data.subscriberList)
            );
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

  onImageUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.icon.ImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.icon.ImageFile = event.target.files[0];
    }
  }

  onLogoUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.icon.logoImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.icon.logoImageFile = event.target.files[0];
    }
  }
  clearLogoFile() {
    this.logoImageFile.nativeElement.value = '';
    this.icon.logoImageUrl = '';
    this.icon.logoImageFile = null;
  }

  clearImageFile() {
    this.ImageFile.nativeElement.value = '';
    this.icon.ImageUrl = '';
    this.icon.ImageFile = null;
  }

  onClickCancel() {
    // this.router.navigate(['/s']);
  }

  onClickSave() {
    const data = new FormData();
    if (this.icon.ImageFile) {
      data.append('image', this.icon.ImageFile);
    }
    if (this.icon.logoImageFile) {
      data.append('logoImage', this.icon.logoImageFile);
    }
    let params = {
      _id: this.icon._id,
      files: this.files,
    };
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.imageUploadService.addIcon(data).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200 && res.data) {
          this._toastMessageService.alert(
            'success',
            'icon added successfully.'
          );
          // this.router.navigate(['/icons']);
        }
      },
      (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
      }
    );
    this.loading = false;
  }

  onClickAddImage() {
    this.router.navigate(['/header/header-dashboard//add-icon']);
  }
  onClickEditImage(icon) {
    this.router.navigate(['/header/header-dashboard/edit-icon/' + icon._id]);
  }

  // onClickDeletePlace(icon) {
  //   this.modalRef = this.modalService.show(ConfirmationModalComponent, {
  //     class: 'confirmation-modal',
  //     backdrop: 'static',
  //     keyboard: false,
  //   });
  //   this.modalRef.content.decision = '';
  //   this.modalRef.content.confirmation_text = `Are you sure to delete ${place.placeName}?`;
  //   var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
  //     if (this.modalRef.content.decision == 'done') {
  //       this.loading = true;
  //       this.imageUploadService.deletePlace(place._id).subscribe(
  //         (res: any) => {
  //           this.loading = false;
  //           if (res.status == 200) {
  //             remove(this.table_data, (ub: any) => ub._id == place._id);
  //             this._toastMessageService.alert(
  //               'success',
  //               'Place deleted successfully.'
  //             );
  //             this.router.navigate(['/places']);
  //           }
  //         },
  //         (error) => {
  //           this.loading = false;
  //           this.commonHelper.showError(error);
  //         }
  //       );
  //     }
  //     tempSubObj.unsubscribe();
  //   });
  // }
}
