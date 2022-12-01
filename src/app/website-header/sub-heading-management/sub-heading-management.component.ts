import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remove } from 'lodash-es';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, Subscription } from 'rxjs';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from 'src/environments/environment';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-sub-heading-management',
  templateUrl: './sub-heading-management.component.html',
  styleUrls: ['./sub-heading-management.component.css'],
})
export class SubHeadingManagementComponent implements OnInit {
  public loading: boolean = false;
  public filters: any = {};
  base_url = environment.url;
  public dialogType: string = 'add';
  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private router: Router,
    private HeaderService: HeaderService
  ) {}

  ngOnInit(): void {
    this.getHeadingWithFilters({ page: 1 });
  }
  getHeadingWithFilters(event) {
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
      this.HeaderService.getAllSubHeader(params).subscribe(
        (res: any) => {
          this.table_data = res.data;
          if (res.status == 200 && res.data.subHeader) {
            this.table_data = [];
            this.table_data = res.data.subHeader;

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

  onClickAddHeading() {
    this.router.navigate(['/websiteheader/websiteSubheading']);
  }
  onClickEditHeading(websitesubheading) {
    this.router.navigate([
      '/websiteheader/edit-header-sub/' + websitesubheading._id,
    ]);
  }

  //Delete Heading
  onClickDeleteHeading(heading) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      class: 'confirmation-modal',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = `Are you sure to delete this footer heading?`;
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == 'done') {
        this.loading = true;
        this.HeaderService.deleteSubHeader(heading._id).subscribe(
          (res: any) => {
            this.loading = false;
            if (res.status == 200) {
              remove(this.table_data, (ub: any) => ub._id == heading._id);
              this._toastMessageService.alert(
                'success',
                'Heading deleted successfully.'
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
