import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { SubscriberService } from 'src/app/services/subscriber.service';

@Component({
  selector: 'app-subscriber-management',
  templateUrl: './subscriber-management.component.html',
  styleUrls: ['./subscriber-management.component.css'],
})
export class SubscriberManagementComponent implements OnInit {
  public loading: boolean = false;

  public filters: any = {};
  public subscriber_obj: any = {};

  base_url = environment.url;
  public dialogType: string = 'add';

  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(
    private subscriberService: SubscriberService,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSubscriberWithFilter({ page: 1 });
  }

  // Get complete list of subscribers
  getSubscriberWithFilter(event) {
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
      this.subscriberService.getAllSubscriber(params).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data.subscriberList) {
            this.table_data = [];
            this.table_data = JSON.parse(
              JSON.stringify(res.data.subscriberList)
            );
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

  onClickAddSubscriber() {
    this.router.navigate(['/subscriber/add-subscriber']);
  }
  onClickEditSubscriber(subscriber) {
    this.router.navigate(['/subscriber/edit-subscriber/' + subscriber._id]);
  }

  //Delete Subscriber
  onClickDeleteSubscriber(subscriber) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      class: 'confirmation-modal',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = `Are you sure you want to delete ${subscriber.subscriberName}?`;
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == 'done') {
        this.loading = true;
        this.subscriberService.deleteSubscriber(subscriber._id).subscribe(
          (res: any) => {
            this.loading = false;
            if (res.status == 200) {
              remove(this.table_data, (ub: any) => ub._id == subscriber._id);
              this._toastMessageService.alert(
                'success',
                'Subscriber deleted successfully.'
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
