import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegisterService } from 'src/app/services/user-register.service';
import { remove } from 'lodash-es';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  user: any = {};
  base_url = environment.url;
  loading: boolean = false;
  urls = [];
  already_uploadedurls = [];
  remaining_url = [];
  uploaded_files = [];
  files = [];
  type = 'add';
  imgclr = false;
  show = false;
  isUser: any;
  isUserId: any;
  token: any;

  public modalRef: BsModalRef;

  @ViewChild('CoverImageFile') CoverImageFile: any;
  @ViewChild('userImageFile') userImageFile: any;
  public table_data: any;

  constructor(
    private router: Router,
    private UserRegisterService: UserRegisterService,
    private activatedRoute: ActivatedRoute,
    private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.isUser = localStorage.getItem('token');
    this.isUserId = localStorage.getItem('user_id');
    this.getAllUser();
  }

  onClickCancel() {
    // this.router.navigate(['/admin-users']);
  }
  onClickUpdate() {
    let userData = {
      token: this.isUser,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      userName: this.user.userName,
      email: this.user.email,
      location: this.user.location,
      shortBio: this.user.shortBio,
    };
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
    if (this.user.userImageFile) {
      data.append('profileImage', this.user.userImageFile);
      this.uploaded_files.push({
        imageactualname: this.user.userImageFile.name,
        type: 'profileImage',
      });
    }

    if (this.user.CoverImageFile) {
      data.append('coverImage', this.user.CoverImageFile);
      this.uploaded_files.push({
        imageactualname: this.user.CoverImageFile.name,
        type: 'coverImage',
      });
    }
    data.append('body', JSON.stringify(userData));
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.UserRegisterService.updateUser(data).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.type = 'add';
            this.user = res.data;
            // this.type = 'add';
            // this.activatedRoute.snapshot.paramMap.get('id');
          }
          this.loading = false;
          this._toastMessageService.alert(
            'success',
            'User updated successfully.'
          );
          // this.router.navigate(['/admin-users']);
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

  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.user.userImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.user.userImageFile = event.target.files[0];
    }
  }

  onCoverCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.user.CoverImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.user.CoverImageFile = event.target.files[0];
    }
  }
  clearCoverCLFile() {
    this.CoverImageFile.nativeElement.value = '';
    this.user.CoverImageUrl = '';
    this.user.CoverImageFile = null;
  }

  clearCLFile() {
    this.userImageFile.nativeElement.value = '';
    this.user.userImageUrl = '';
    this.user.userImageFile = null;
  }

  getAllUser() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.UserRegisterService.getUser(this.isUserId).subscribe(
        (res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data.userList) {
            this.table_data = res.data.userList;
            this.user = res.data.userList[0];
            console.log(this.user);
            console.log(this.table_data);

            // this.table_data = JSON.parse(JSON.stringify(res.data.userList));
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

  //Delete User
  onClickDeleteUser(user) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      class: 'confirmation-modal',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = `Are you sure you want to delete ${user.userName}?`;
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == 'done') {
        this.loading = true;
        this.UserRegisterService.deleteUser(user._id).subscribe(
          (res: any) => {
            this.loading = false;
            if (res.status == 200) {
              remove(this.table_data, (ub: any) => ub._id == user._id);
              this._toastMessageService.alert(
                'success',
                'User deleted successfully.'
              );
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
