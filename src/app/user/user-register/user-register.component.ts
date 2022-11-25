import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegisterService } from 'src/app/services/user-register.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  user: any = {};
  base_url = environment.url;
  loading: boolean = false;
  type = 'add';
  show = false;
  public modalRef: BsModalRef;

  constructor(
    private router: Router,
    private UserRegisterService: UserRegisterService,
    private activatedRoute: ActivatedRoute,
    private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper
  ) {}

  ngOnInit(): void {}

  onClickSave() {
    this.loading = true;
    let userData = {
      userName: this.user.userName,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password,
    };
    console.log(userData);

    this.UserRegisterService.userRegister(userData).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200) {
          this._toastMessageService.alert(
            'success',
            'Registration successfull.'
          );

          this.router.navigate(['/header']);
        }
      },
      (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
      }
    );
  }
}
