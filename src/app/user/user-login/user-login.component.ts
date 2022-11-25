import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { AuthService } from 'src/app/services/auth.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  userPass: any;
  userEmail: any;
  resetEmail: any;
  step: any = 'login';
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.changeStep('login');
  }

  login() {
    if (!this.userEmail || !this.userPass) {
      return;
    }
    const data = {
      email: this.userEmail.trim().toLowerCase(),
      password: this.userPass,
    };

    this.loading = true;
    this.authService.login(data).subscribe(
      (response: any) => {
        this.loading = false;
        if (
          response.data &&
          response.data.accessToken &&
          response.data.userId
        ) {
          // console.log(response.data);
          this._toastMessageService.alert(
            'Success',
            'Login Successfull, Please wait...'
          );
          localStorage.token = response.data.accessToken;
          localStorage.user_id = response.data.userId;
          this.authService.setIsAuth(true);
          if (response.data.admin) {
            console.log(response.data.admin);
            this.router.navigate(['/dashboard']);
          }
          if (response.data.user) {
            console.log(response.data.user);

            this.router.navigate(['/homepage/home']);
          }
        }
      },
      (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
      }
    );
  }

  forgotPassword() {
    if (!this.resetEmail) {
      this._toastMessageService.alert('error', 'please enter email');
    }

    this.loading = true;
    let data = { email: this.resetEmail.trim().toLowerCase() };
    this.authService.forgotPassword(data).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200) {
          this._toastMessageService.alert(
            'success',
            'We have sent a reset password link to your email. Didn’t receive the email? Check email address again or look in your spam folder.'
          );
          this.changeStep('login');
        }
      },
      (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
      }
    );
  }

  changeStep(tstep) {
    this.userEmail = '';
    this.userPass = '';
    this.resetEmail = '';
    this.step = tstep;
  }
}
