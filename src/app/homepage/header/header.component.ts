import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ImageuploadService } from 'src/app/services/imageupload.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  base_url = environment.url;
  // loading: boolean = false;
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
  // public table_data: any[] = [];
  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  // base_url = environment.url;

  @ViewChild('ImageFile') ImageFile: any;
  @ViewChild('logoImageFile') logoImageFile: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _toastMessageService: ToastMessageService,
    private sanitizer: DomSanitizer,
    private commonHelper: CommonHelper,
    private imageUploadService: ImageuploadService
  ) {}

  ngOnInit(): void {
    this.getIconData();
  }

  getIconData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.imageUploadService.getIcon().subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.icon = res.data;
            console.log(res.data, this.icon);
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
