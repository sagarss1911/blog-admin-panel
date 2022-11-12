import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminUserService } from 'src/app/services/admin-user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex } from 'lodash-es';

@Component({
  selector: 'add-admin-users',
  templateUrl: './add-admin-users.html',
  styleUrls: ['./add-admin-users.css'],
})
export class AddAdminUsersComponent implements OnInit {
  user: any = {};
  base_url = environment.url;
  loading: boolean = false;
  type = 'add';
  show = false;

  public modalRef: BsModalRef;
  constructor(
    private router: Router,
    private AdminUserService: AdminUserService,
    private activatedRoute: ActivatedRoute,
    private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper
  ) {}

  ngOnInit() {
    this.type = 'add';
    this.user._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';

    if (this.user._id) {
      this.show = true;
      this.type = 'edit';
      this.getUserDetails();
    }
  }

  getUserDetails() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let data = { _id: this.user._id };
      this.AdminUserService.getUserData(data).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.user = res.data;
            this.user.active =
              this.user.active && this.user.active == true ? true : false;
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
    this.router.navigate(['/admin-users']);
  }

  onClickUpdate() {
    let userData = {
      active: this.user.active,
      email: this.user.email,
      password: this.user.password,
      userName: this.user.userName,
      name: this.user.name,
    };
    return new Promise((resolve, reject) => {
      this.AdminUserService.updateUser(this.user._id, userData).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.type = 'add';
            this.user = res.data;
            this.activatedRoute.snapshot.paramMap.get('id');
          }
          this.loading = false;
          this._toastMessageService.alert(
            'success',
            'User updated successfully.'
          );
          this.router.navigate(['/admin-users']);
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

  onClickSave() {
    this.loading = true;
    let userData = {
      active: this.user.active,
      email: this.user.email,
      password: this.user.password,
      userName: this.user.userName,
      name: this.user.name,
    };
    this.AdminUserService.addUser(userData).subscribe(
      (res: any) => {
        this.loading = false;
        console.log(res);

        if (res.status == 200) {
          this._toastMessageService.alert(
            'success',
            'User added successfully.'
          );
          this.router.navigate(['/admin-users']);
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
