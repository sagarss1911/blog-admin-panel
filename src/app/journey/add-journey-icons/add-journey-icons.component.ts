import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { JourneyService } from 'src/app/services/journey.service';
@Component({
  selector: 'app-add-journey-icons',
  templateUrl: './add-journey-icons.component.html',
  styleUrls: ['./add-journey-icons.component.css'],
})
export class AddJourneyIconsComponent
  extends BaseModalComponent
  implements OnInit
{
  base_url = environment.url;
  loading: boolean = false;
  decision: string = '';
  dialogType: string = '';
  journey_obj: any;
  dialogResult: any;
  newImageUploaded: boolean = false;
  @ViewChild('journeyIconImageFile') journeyIconImageFile: any;
  constructor(
    public modalRef: BsModalRef,
    private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper,
    private journeyService: JourneyService,
    private sanitizer: DomSanitizer
  ) {
    super(modalRef);
  }

  ngOnInit() {}

  onClose() {
    this.decision = '';
    this.close(true);
  }

  done() {
    this.decision = 'done';
    this.close(true);
  }

  addjourney() {
    const data = new FormData();
    data.append('image', this.journey_obj.journeyIconImageFile);
    let params = {
      journeyText: this.journey_obj.journeyText,
      journeyTag: this.journey_obj.journeyTag,
    };
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.journeyService.addJourneyIcon(data).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200 && res.data) {
          this._toastMessageService.alert(
            'success',
            'journeyIcon added successfully.'
          );
          this.dialogResult = res.data;
          this.done();
        }
      },
      (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
      }
    );
  }

  updatejourney() {
    const data = new FormData();
    data.append('image', this.journey_obj.journeyIconImageFile);
    let params = {
      _id: this.journey_obj._id,
      journeyText: this.journey_obj.journeyText,
      journeyTag: this.journey_obj.journeyTag,
    };
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.journeyService.addJourneyIcon(data).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200 && res.data) {
          this._toastMessageService.alert(
            'success',
            'journeyIcon updated successfully.'
          );
          this.dialogResult = res.data;
          this.done();
        }
      },
      (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
      }
    );
  }
  onTagChange(event) {
    this.journey_obj.tag = event.name;
  }

  clearCLFile() {
    this.journeyIconImageFile.nativeElement.value = '';
    this.journey_obj.journeyImageUrl = '';
    this.journey_obj.journeyIconImageFile = null;
    this.newImageUploaded = false;
  }

  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newImageUploaded = true;
      this.journey_obj.journeyImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.journey_obj.journeyIconImageFile = event.target.files[0];
    }
  }
}
