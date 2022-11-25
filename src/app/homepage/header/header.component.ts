import { DIR_DOCUMENT_FACTORY } from '@angular/cdk/bidi/dir-document-token';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { AuthService } from 'src/app/services/auth.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from 'src/environments/environment';
import { UserRegisterService } from 'src/app/services/user-register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  base_url = environment.url;
  user: any;
  profileImage: any;
  urls = [];
  files = [];
  type = 'add';
  err = false;
  icon: any;
  iconid: any;
  public table_data: any[] = [];
  data: any;
  public loading: boolean = false;
  public filters: any = {};
  public dialogType: string = 'add';
  public paginationValues: Subject<any> = new Subject();
  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  isUser: any;
  isUserId: any;
  // public show: boolean = false;
  // public subMenu: any = 'Show';

  @ViewChild('ImageFile') ImageFile: any;
  @ViewChild('logoImageFile') logoImageFile: any;
  @ViewChild('CoverImageFile') CoverImageFile: any;
  @ViewChild('userImageFile') userImageFile: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _toastMessageService: ToastMessageService,
    private sanitizer: DomSanitizer,
    private commonHelper: CommonHelper,
    private imageUploadService: ImageUploadService,
    private authservice: AuthService,
    private UserRegisterService: UserRegisterService
  ) {}

  ngOnInit(): void {
    this.isUser = localStorage.getItem('token');
    this.isUserId = localStorage.getItem('user_id');
    this.getAllUser();
    this.getIconData();
  }

  getIconData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.imageUploadService.getIcon().subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.icon = res.data;
            // console.log(res.data, this.icon);
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

  loggedIn() {
    return localStorage.getItem('token');
  }

  logout() {
    this.loading = true;
    this.authservice.logout().subscribe(
      (res: any) => {
        this.loading = false;
        this.authservice.setIsAuth(false);
        localStorage.clear();
        this.router.navigate(['/header']);
      },
      (error) => {
        this.loading = false;
        //this.commonHelper.showError(error);
        // this.router.navigate(['/login']);
      }
    );
  }

  toggleMenu() {
    let subMenu = document.getElementById('subMenu');
    subMenu.classList.toggle('open-menu');
  }

  getAllUser() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.UserRegisterService.getUser(this.isUserId).subscribe(
        (res: any) => {
          console.log(res);
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
