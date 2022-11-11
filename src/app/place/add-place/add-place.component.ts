import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from 'src/app/services/place.service';
@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css'],
})
export class AddPlaceComponent implements OnInit {
  place: any = { colors: [] };
  base_url = environment.url;
  loading: boolean = false;
  urls = [];
  files = [];
  type = 'add';
  err = false;

  @ViewChild('placeImageFile') placeImageFile: any;
  @ViewChild('mapImageFile') mapImageFile: any;
  @ViewChild('productcolorImageFile') productcolorImageFile: any;
  public modalRef: BsModalRef;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _toastMessageService: ToastMessageService,
    private sanitizer: DomSanitizer,
    private commonHelper: CommonHelper,

    private placeService: PlaceService
  ) {}

  ngOnInit() {
    this.place._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';
    if (this.place._id) {
      this.type = 'edit';
      this.getPlaceData();
    }
  }

  getPlaceData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.placeService.getPlace({ _id: this.place._id }).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.place = res.data;
            this.place.active =
              this.place.active && this.place.active == true ? true : false;
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

  onImageUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.place.placeImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.place.placeImageFile = event.target.files[0];
      this.place.newImageUploaded = true;
    }
  }

  onMapUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.place.mapImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.place.mapImageFile = event.target.files[0];
      this.place.newmapImageUploaded = true;
    }
  }
  clearMapFile() {
    this.mapImageFile.nativeElement.value = '';
    this.place.mapImageUrl = '';
    this.place.mapImageFile = null;
    this.place.newmapImageUploaded = false;
  }

  clearImageFile() {
    this.placeImageFile.nativeElement.value = '';
    this.place.placeImageUrl = '';
    this.place.placeImageFile = null;
    this.place.newImageUploaded = false;
  }

  onClickCancel() {
    this.router.navigate(['/places']);
  }
  onClickSave() {
    const data = new FormData();
    if (this.place.placeImageFile) {
      data.append('image', this.place.placeImageFile);
    }
    if (this.place.mapImageFile) {
      data.append('mapImage', this.place.mapImageFile);
    }
    let params = {
      _id: this.place._id,
      placeName: this.place.placeName,
      files: this.files,
      seoTitle: this.place.seoTitle,
      seoDescription: this.place.seoDescription,
      seoKeyword: this.place.seoKeyword,
      active: this.place.active,
    };
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.placeService.addPlace(data).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200 && res.data) {
          this._toastMessageService.alert(
            'success',
            'place added successfully.'
          );
          this.router.navigate(['/places']);
        }
      },
      (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
      }
    );
    this.loading = false;
  }
}
