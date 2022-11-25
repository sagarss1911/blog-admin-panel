import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { UserRegisterService } from 'src/app/services/user-register.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  public modalRef: BsModalRef;
  user: any = {};
  isUser: any;
  isUserId: any;
  loading: boolean = false;
  type = 'add';
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

  onClickUpdatePassword() {
    let userData = {
      token: this.isUser,
      userName: this.user.userName,
      email: this.user.email,
      password: this.user.password,
    };
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.UserRegisterService.updatePassword(userData).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.user = res.data;
          }
          this.loading = false;
          this._toastMessageService.alert(
            'success',
            'Password updated successfully.'
          );
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

  changePassword() {
    let data = {
      id: this.isUserId,
      email: this.user.email,
      oldPassword: this.user.oldPassword,
      newPassword: this.user.newPassword,
    };
    console.log(data);

    this.loading = true;
    return new Promise((resolve, reject) => {
      this.UserRegisterService.updatePassword(data).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.type = 'add';
            this.user = res.data;
            console.log(res.data);
          }
          this.loading = false;
          this._toastMessageService.alert(
            'success',
            'Password changed successfully.'
          );
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

  getAllUser() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.UserRegisterService.getUser(this.isUserId).subscribe(
        (res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data.userList) {
            this.table_data = res.data.userList;
            this.user = res.data.userList[0];
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

  
}
