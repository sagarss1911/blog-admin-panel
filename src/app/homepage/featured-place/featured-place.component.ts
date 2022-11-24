import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { PlaceService } from 'src/app/services/place.service';
@Component({
  selector: 'app-featured-place',
  templateUrl: './featured-place.component.html',
  styleUrls: ['./featured-place.component.css'],
})
export class FeaturedPlaceComponent implements OnInit {
  public places: any = [];
  public modalRef: BsModalRef;
  base_url = environment.url;
  constructor(
    private placeService: PlaceService,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.placeService.getAllFeaturedPlace().subscribe(
      (res: any) => {
        if (res.status == 200 && res.data.places) {
          this.places = [];
          this.places = JSON.parse(JSON.stringify(res.data.places));
          console.log(this.places);
        } else if (res.status == 400) {
          this._toastMessageService.alert('error', res.data.msg);
        }
        // return resolve(true);
      },
      (error) => {
        this.commonHelper.showError(error);
        // return resolve(false);
      }
    );
  }
}
