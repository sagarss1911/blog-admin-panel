import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomPathService } from 'src/app/services/room_path.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import { AddUpdateRoomsPathModalComponent } from 'src/app/rooms-path/rooms-path-management/add-update-rooms-path-modal/add-update-rooms-path-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'rooms-path-management',
  templateUrl: './rooms-path-management.component.html',
  styleUrls: ['./rooms-path-management.component.css']
})
export class RoomsPathManagementComponent implements OnInit {
  public loading: boolean = false;


  public slider_obj: any = {}

  base_url = environment.url;
  public dialogType: string = "add";


  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private RoomPathService: RoomPathService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getSlidersWithFilters({ page: 1 });

  }

  getSlidersWithFilters(event) {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        page: event.page,
        limit: event.limit ? event.limit : this.recordLimit
      };
      this.recordLimit = params.limit;
      this.RoomPathService.getAllSlider(params).subscribe((res: any) => {
        if (res.status == 200 && res.data.slides) {
          this.table_data = [];
          this.table_data = JSON.parse(JSON.stringify(res.data.slides));
          this.paginationValues.next({ type: 'page-init', page: params.page, totalTableRecords: res.data.total_count });
        } else if (res.status == 400) {
          this._toastMessageService.alert("error", res.data.msg);
        }
        this.loading = false;
        return resolve(true);
      }, (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
        return resolve(false);
      })
    });
  }


  onClickAddSlider() {
    this.slider_obj = {
      id: null,
    };

    this.dialogType = 'add';
    this.showAddSliderModal();
  }
  onClickEditSlider(slider) {
    this.slider_obj = JSON.parse(JSON.stringify(slider));
    this.dialogType = 'update';
    this.showAddSliderModal();
  }
  onClickDeleteSlider(slider) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, { class: 'confirmation-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = "Are you sure to delete this?"
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.RoomPathService.deleteSlider(slider._id).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200) {
            remove(this.table_data, (ub: any) => ub._id == slider._id);
            this._toastMessageService.alert("success", "Room Image deleted successfully.");
          }
        }, (error) => {
          this.loading = false;
          this.commonHelper.showError(error);
        });
      }
      tempSubObj.unsubscribe();
    });
  }
  showAddSliderModal() {
    this.modalRef = this.modalService.show(AddUpdateRoomsPathModalComponent, { class: 'add-update-room-path-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = "";
    this.modalRef.content.dialogType = this.dialogType;
    this.modalRef.content.slider_obj = this.slider_obj;
    var tempSubObj: Subscription = this.modalRef.content.onHide.subscribe(() => {
      if (this.modalRef.content.decision === 'done') {
        if (this.dialogType == "add") {
          this.table_data.unshift(JSON.parse(JSON.stringify(this.modalRef.content.dialogResult)));
        } else if (this.dialogType == "update") {
          for (var i = 0, fLen = this.table_data.length; i < fLen; i++) {
            if (this.table_data[i]._id == this.modalRef.content.dialogResult._id) {
              this.table_data[i] = this.modalRef.content.dialogResult;
              break;
            }
          }
        }
      }
      tempSubObj.unsubscribe();
    });

  }

}
