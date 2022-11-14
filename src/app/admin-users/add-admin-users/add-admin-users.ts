import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminUserService } from 'src/app/services/admin-user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  // fetching admin list and binding the response to display the list of all admin user's
  getUserDetails() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let data = { _id: this.user._id };
      this.AdminUserService.getUserData(data).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.user = res.data;
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

  //updating the admin details from id in path
  onClickUpdate() {
    let userData = {
      userName: this.user.userName,
      name: this.user.name,
      email: this.user.email,
      password: this.user.password,
      active: this.user.active,
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

  //adding a new admin with all the required details
  onClickSave() {
    this.loading = true;
    let userData = {
      userName: this.user.userName,
      name: this.user.name,
      active: this.user.active,
      email: this.user.email,
      password: this.user.password,
    };
    this.AdminUserService.addUser(userData).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200) {
          this._toastMessageService.alert(
            'success',
            'Admin added successfully.'
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
