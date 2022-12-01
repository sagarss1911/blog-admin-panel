import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remove } from 'lodash-es';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, Subscription } from 'rxjs';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from 'src/environments/environment';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { FooterService } from 'src/app/services/footer.service';
@Component({
  selector: 'app-link-management',
  templateUrl: './link-management.component.html',
  styleUrls: ['./link-management.component.css'],
})
export class LinkManagementComponent implements OnInit {
  public loading: boolean = false;

  public filters: any = {};
  public slider_obj: any = {};

  base_url = environment.url;
  public dialogType: string = 'add';

  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];

  public parent: any;

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private router: Router,
    private FooterService: FooterService
  ) {}

  ngOnInit(): void {
    this.getLinksWithFilters({ page: 1 });
  }
  getLinksWithFilters(event) {
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
      this.FooterService.getAllLinks(params).subscribe(
        (res: any) => {
          this.table_data = res.data;
          if (res.status == 200 && res.data.websiteLinks) {
            this.table_data = [];
            this.table_data = res.data.websiteLinks;
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

  onClickAddLinks() {
    this.router.navigate(['/websitefooter/add-footer-links']);
  }
  onClickEditLinks(websitefooterlink) {
    this.router.navigate([
      '/websitefooter/edit-footer-links/' + websitefooterlink._id,
    ]);
  }

  //Delete link
  onClickDeleteLinks(link) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      class: 'confirmation-modal',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = `Are you sure to delete this ${link.linkName}?`;
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == 'done') {
        this.loading = true;
        this.FooterService.deleteLinks(link._id).subscribe(
          (res: any) => {
            this.loading = false;
            if (res.status == 200) {
              remove(this.table_data, (ub: any) => ub._id == link._id);
              this._toastMessageService.alert(
                'success',
                'Link deleted successfully.'
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
