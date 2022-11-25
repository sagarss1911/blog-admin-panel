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
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent implements OnInit {
  user: any = {};
  base_url = environment.url;
  loading: boolean = false;
  imgclr = false;
  show = false;
  isUser: any;
  isUserId: any;
  public modalRef: BsModalRef;
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
    this.isUserId = localStorage.getItem('user_id');
    this.getAllUser();
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
