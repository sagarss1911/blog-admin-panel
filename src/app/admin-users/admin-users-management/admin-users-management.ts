import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { AdminUserService } from 'src/app/services/admin-user.service';
@Component({
  selector: 'admin-users-management',
  templateUrl: './admin-users-management.html',
  styleUrls: ['./admin-users-management.css'],
})
export class AdminUsersManagementComponent implements OnInit {
  public loading: boolean = false;
  public filters: any = {};
  base_url = environment.url;
  public dialogType: string = 'add';
  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public user_list: any;
  public recordLimit: number = 5;
  public modalRef: BsModalRef;
  constructor(
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private router: Router,
    private AdminUserService: AdminUserService
  ) {}

  ngOnInit(): void {
    this.getUsersWithFilters({ page: 1 });
  }

  //sending filetrs and pagination value to fetch the admin list
  getUsersWithFilters(event) {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        filters: {},
        page: event.page,
        limit: event.limit ? event.limit : this.recordLimit,
      };
      this.recordLimit = params.limit;
      if (this.filters.searchtext) {
        params['filters']['searchtext'] = this.filters.searchtext;
      }
      this.AdminUserService.getUserData(params).subscribe(
        (res: any) => {
          if (res.status == 200) {
            this.table_data = [];
            this.user_list = res.data.adminList;
            this.paginationValues.next({
              type: 'page-init',
              page: params.page,
              totalTableRecords: res.data.total_count,
            });
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

  onClickAddUser() {
    this.router.navigate(['/admin-users/add-user']);
  }
  onClickEditUser(user) {
    this.router.navigate(['/admin-users/edit-user/' + user._id]);
  }

  //deleting a particular admin by sending its id
  onClickDeleteUser(user) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      class: 'confirmation-modal',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = `Are you sure to delete ${user.name} ?`;
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == 'done') {
        this.loading = true;
        this.AdminUserService.deleteUser(user._id).subscribe(
          (res: any) => {
            this.loading = false;
            if (res.status == 200) {
              remove(this.user_list, (ub: any) => ub._id == user._id);
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
