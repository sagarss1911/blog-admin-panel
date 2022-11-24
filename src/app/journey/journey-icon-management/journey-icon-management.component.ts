import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { JourneyService } from 'src/app/services/journey.service';
import { AddJourneyIconsComponent } from '../add-journey-icons/add-journey-icons.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journey-icon-management',
  templateUrl: './journey-icon-management.component.html',
  styleUrls: ['./journey-icon-management.component.css'],
})
export class JourneyIconManagementComponent implements OnInit {
  public loading: boolean = false;
  public filters: any = {};
  public journey_obj: any = {};
  base_url = environment.url;
  public dialogType: string = 'add';
  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(
    private journeyService: JourneyService,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getJourneyIconsWithFilters({ page: 1 });
  }

  getJourneyIconsWithFilters(event) {
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
      this.journeyService.getAllJourneyIcon(params).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data.JourneyIcons) {
            this.table_data = [];
            this.table_data = JSON.parse(JSON.stringify(res.data.JourneyIcons));
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

  onClickAddJourneyIcon() {
    this.journey_obj = {
      _id: null,
    };

    this.dialogType = 'add';
    this.showAddJourneyIconModal();
  }
  onClickEditJourneyIcon(journey) {
    this.journey_obj = JSON.parse(JSON.stringify(journey));
    console.log(this.journey_obj);
    this.dialogType = 'update';
    this.showAddJourneyIconModal();
  }

  showAddJourneyIconModal() {
    this.modalRef = this.modalService.show(AddJourneyIconsComponent, {
      class: 'add-update-slider-modal',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content.decision = '';
    this.modalRef.content.dialogType = this.dialogType;
    this.modalRef.content.journey_obj = this.journey_obj;
    var tempSubObj: Subscription = this.modalRef.content.onHide.subscribe(
      () => {
        if (this.modalRef.content.decision === 'done') {
          if (this.dialogType == 'add') {
            console.log(this.modalRef.content.dialogResult, 'adding');
            this.table_data.unshift(
              JSON.parse(JSON.stringify(this.modalRef.content.dialogResult))
            );
          } else if (this.dialogType == 'update') {
            for (var i = 0, fLen = this.table_data.length; i < fLen; i++) {
              if (
                this.table_data[i]._id == this.modalRef.content.dialogResult._id
              ) {
                this.table_data[i] = this.modalRef.content.dialogResult;
                break;
              }
            }
          }
        }
        tempSubObj.unsubscribe();
      }
    );
  }
  onClickDeleteJourneyIcon(journey) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      class: 'confirmation-modal',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text =
      'Are you sure to delete this Icon?';
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == 'done') {
        this.loading = true;
        this.journeyService.deleteJourneyIcon(journey._id).subscribe(
          (res: any) => {
            this.loading = false;
            if (res.status == 200) {
              remove(this.table_data, (ub: any) => ub._id == journey._id);
              this._toastMessageService.alert(
                'success',
                'Icon deleted successfully.'
              );
              this.router.navigate(['/journeys/journeyIconManagement']);
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
