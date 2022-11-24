import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { AboutUsService } from 'src/app/services/about-us.service';
@Component({
  selector: 'app-about-us-management',
  templateUrl: './about-us-management.component.html',
  styleUrls: ['./about-us-management.component.css'],
})
export class AboutUsManagementComponent implements OnInit {
  public loading: boolean = false;
  public filters: any = {};
  public dialogType: string = 'add';
  public table_data: any;
  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  base_url = environment.url;

  constructor(
    private aboutUsService: AboutUsService,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAboutUsDetails();
  }

  getAboutUsDetails() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.aboutUsService.getAboutUsDetails().subscribe(
        (res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data) {
            this.table_data = [];
            this.table_data = res.data;
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

  onClickAddAboutUs() {
    this.router.navigate(['/aboutus/add-aboutUs']);
  }
  onClickAddAboutUsCards() {
    this.router.navigate(['/aboutus/aboutUsCardManagement']);
  }
  onClickEditAboutUs(aboutus) {
    this.router.navigate(['/aboutus/edit-aboutUs/' + aboutus._id]);
  }
  onClickDeleteAboutUs(aboutus) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      class: 'confirmation-modal',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = `Are you sure to delete About Us page?`;
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == 'done') {
        this.loading = true;
        this.aboutUsService.deleteAboutUs(aboutus._id).subscribe(
          (res: any) => {
            this.loading = false;
            if (res.status == 200) {
              remove(this.table_data, (ub: any) => ub._id == aboutus._id);
              this._toastMessageService.alert(
                'success',
                'Aboutus deleted successfully.'
              );
              this.router.navigate(['/aboutus']);
            }
          },
          (error) => {
            this.loading = false;
            this.commonHelper.showError(error);
          }
        );
      }
      tempSubObj.unsubscribe();
    });
  }
}
