import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { JourneyService } from 'src/app/services/journey.service';

@Component({
  selector: 'app-journey-card-management',
  templateUrl: './journey-card-management.component.html',
  styleUrls: ['./journey-card-management.component.css'],
})
export class JourneyCardManagementComponent implements OnInit {
  public loading: boolean = false;
  public filters: any = {};
  public dialogType: string = 'add';
  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  base_url = environment.url;

  constructor(
    private journeyService: JourneyService,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCardswithFilters({ page: 1 });
  }

  getCardswithFilters(event) {
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
      this.journeyService.getJourneyCardDetail(params).subscribe(
        (res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data.cards) {
            this.table_data = [];
            this.table_data = JSON.parse(JSON.stringify(res.data.cards));
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

  onClickAddJourney() {
    this.router.navigate(['/journeys/add-journey-card']);
  }
  onClickEditJourneyCards(journey) {
    console.log(journey);

    this.router.navigate(['/journeys/edit-journey-card/' + journey._id]);
  }
  onClickDeleteJourneyCards(journey) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      class: 'confirmation-modal',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = `Are you sure to delete this journey card?`;
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == 'done') {
        this.loading = true;
        this.journeyService.deleteJourneyCard(journey._id).subscribe(
          (res: any) => {
            this.loading = false;
            if (res.status == 200) {
              remove(this.table_data, (ub: any) => ub._id == journey._id);
              this._toastMessageService.alert(
                'success',
                'Journey card deleted successfully.'
              );
              this.router.navigate(['/journeys/journeyCardManagement']);
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
