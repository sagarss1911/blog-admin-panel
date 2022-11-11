import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex } from 'lodash-es';

@Component({
  selector: 'add-admin-users',
  templateUrl: './add-admin-users.html',
  styleUrls: ['./add-admin-users.css'],
})
export class AddAdminUsersComponent implements OnInit {
  // // product: any = { colors: [] };
  // place: any = { colors: [] };
  ngOnInit(): void {}
  // base_url = environment.url;
  // loading: boolean = false;
  // collection_data = [];
  // urls = [];
  // already_uploadedurls = [];
  // remaining_url = [];
  // uploaded_files = [];
  // category_data = [];
  // color_data = [];
  // thickness_data = [];
  // length_data = [];
  // files = [];
  // material_data = [];
  // type = 'add';
  // imgclr = false;
  // err = false;

  // @ViewChild('placeImageFile') placeImageFile: any;
  // @ViewChild('mapImageFile') mapImageFile: any;
  // @ViewChild('productcolorImageFile') productcolorImageFile: any;
  // public modalRef: BsModalRef;
  // constructor(
  //   private router: Router,
  //   private activatedRoute: ActivatedRoute,
  //   private productService: ProductService,
  //   private _toastMessageService: ToastMessageService,
  //   private modalService: BsModalService,
  //   private sanitizer: DomSanitizer,
  //   private collectionService: CollectionService,
  //   private commonHelper: CommonHelper,
  //   private commonService: CommonService
  // ) {}

  // ngOnInit() {
  //   this.place._id = this.activatedRoute.snapshot.paramMap.get('id')
  //     ? this.activatedRoute.snapshot.paramMap.get('id')
  //     : '';
  //   if (this.place._id) {
  //     this.type = 'edit';
  //     this.getPlaceData();
  //   }
  // }
  // getPlaceData() {
  //   this.loading = true;
  //   return new Promise((resolve, reject) => {
  //     this.commonService.getProduct({ _id: this.place._id }).subscribe(
  //       (res: any) => {
  //         if (res.status == 200 && res.data) {
  //           this.place = res.data;
  //           console.log(res.data, 'resp of get for update');

  //           this.already_uploadedurls = res.data.option_images
  //             ? res.data.option_images
  //             : [];
  //           this.place.active =
  //             this.place.active && this.place.active == true ? true : false;
  //         }
  //         this.loading = false;
  //         return resolve(true);
  //       },
  //       (error) => {
  //         this.loading = false;
  //         this.commonHelper.showError(error);
  //         return resolve(false);
  //       }
  //     );
  //   });
  // }
  // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var filesAmount = event.target.files.length;
  //     for (let i = 0; i < filesAmount; i++) {
  //       this.files.push({ file: event.target.files[i], type: 'optional' });
  //       var reader = new FileReader();
  //       reader.onload = (event: any) => {
  //         this.urls.push({ url: event.target.result });
  //       };
  //       reader.readAsDataURL(event.target.files[i]);
  //     }
  //     this.err = false;
  //   }
  // }
  // clearOptionalFile(i) {
  //   this.files[i].isdelete = 1;
  //   this.urls[i].isdelete = 1;
  //   let a = this.urls.filter((fl) => {
  //     return !fl.isdelete;
  //   });
  //   if (a.length > 0) {
  //     this.err = true;
  //   }
  // }

  // clearAlreadyUploadedFile(image) {
  //   let findI = findIndex(this.already_uploadedurls, (v) => {
  //     return v.baseimage == image;
  //   });
  //   if (findI != -1) {
  //     this.already_uploadedurls[findI].isdelete = 1;
  //   }
  //   this.remaining_url = this.already_uploadedurls
  //     .filter((fl) => {
  //       return !fl.isdelete;
  //     })
  //     .map((a) => {
  //       return a.baseimage;
  //     });
  // }
  // getAllCollections() {
  //   this.loading = true;
  //   return new Promise((resolve, reject) => {
  //     let params = {
  //       page: 1,
  //       limit: 100,
  //     };
  //     this.collectionService.getAllCollection(params).subscribe(
  //       (res: any) => {
  //         if (res.status == 200 && res.data.slides) {
  //           this.collection_data = [];
  //           this.collection_data = JSON.parse(JSON.stringify(res.data.slides));
  //           this.collection_data = this.collection_data.map((a) => {
  //             return { _id: a._id, name: a.name };
  //           });
  //         }
  //         this.loading = false;
  //         return resolve(true);
  //       },
  //       (error) => {
  //         this.loading = false;
  //         this.commonHelper.showError(error);
  //         return resolve(false);
  //       }
  //     );
  //   });
  // }

  // getAllCategory() {
  //   this.loading = true;
  //   return new Promise((resolve, reject) => {
  //     let params = {
  //       page: 1,
  //       limit: 100,
  //     };
  //     this.commonService.getAllProductCategory(params).subscribe(
  //       (res: any) => {
  //         if (res.status == 200 && res.data) {
  //           this.category_data = [];
  //           this.category_data = JSON.parse(JSON.stringify(res.data));
  //           this.category_data = this.category_data.map((a) => {
  //             return { _id: a._id, name: a.name };
  //           });
  //         }
  //         this.loading = false;
  //         return resolve(true);
  //       },
  //       (error) => {
  //         this.loading = false;
  //         this.commonHelper.showError(error);
  //         return resolve(false);
  //       }
  //     );
  //   });
  // }

  // onCLUpload(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //     this.place.placeImageUrl = this.sanitizer.bypassSecurityTrustUrl(
  //       URL.createObjectURL(event.target.files[0])
  //     );
  //     this.place.placeImageFile = event.target.files[0];
  //     this.place.newImageUploaded = true;
  //   }
  // }

  // onMapCLUpload(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //     this.place.mapImageUrl = this.sanitizer.bypassSecurityTrustUrl(
  //       URL.createObjectURL(event.target.files[0])
  //     );
  //     this.place.mapImageFile = event.target.files[0];
  //     this.place.newmapImageUploaded = true;
  //   }
  // }
  // clearMapCLFile() {
  //   this.mapImageFile.nativeElement.value = '';
  //   this.place.mapImageUrl = '';
  //   this.place.mapImageFile = null;
  //   this.place.newmapImageUploaded = false;
  // }

  // clearCLFile() {
  //   this.placeImageFile.nativeElement.value = '';
  //   this.place.placeImageUrl = '';
  //   this.place.placeImageFile = null;
  //   this.place.newImageUploaded = false;
  // }

  // onClickCancel() {
  //   this.router.navigate(['/places']);
  // }
  // onClickSave() {
  //   this.remaining_url = this.already_uploadedurls
  //     .filter((fl) => {
  //       return !fl.isdelete;
  //     })
  //     .map((a) => {
  //       return a.baseimage;
  //     });
  //   this.uploaded_files = [];

  //   const data = new FormData();
  //   this.uploaded_files = [];
  //   if (this.place.placeImageFile) {
  //     data.append('image', this.place.placeImageFile);
  //     this.uploaded_files.push({
  //       imageactualname: this.place.placeImageFile.name,
  //       type: 'place',
  //     });
  //   }
  //   if (this.place.mapImageFile) {
  //     data.append('mapImage', this.place.mapImageFile);
  //     this.uploaded_files.push({
  //       imageactualname: this.place.mapImageFile.name,
  //       type: 'mapImage',
  //     });
  //   }

  //   let params = {
  //     _id: this.place._id,
  //     placeName: this.place.placeName,
  //     newImageUploaded: this.place.newImageUploaded,
  //     files: this.files,
  //     seoTitle: this.place.seoTitle,
  //     seoDescription: this.place.seoDescription,
  //     seoKeyword: this.place.seoKeyword,
  //     active: this.place.active,
  //     uploaded_files: this.uploaded_files,
  //     remaining_url: this.remaining_url,
  //   };
  //   data.append('body', JSON.stringify(params));

  //   this.loading = true;
  //   this.commonService.addPlace(data).subscribe(
  //     (res: any) => {
  //       this.loading = false;
  //       if (res.status == 200 && res.data) {
  //         this._toastMessageService.alert(
  //           'success',
  //           'place added successfully.'
  //         );
  //         console.log(res.data, 'adeded');

  //         this.router.navigate(['/places']);
  //       }
  //     },
  //     (error) => {
  //       this.loading = false;
  //       this.commonHelper.showError(error);
  //     }
  //   );
  //   this.loading = false;
  // }
}
