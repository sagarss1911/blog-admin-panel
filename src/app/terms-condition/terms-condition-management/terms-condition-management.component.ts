import { Component, OnInit, ViewChild } from '@angular/core';
import { TermConditionsService } from 'src/app/services/term_conditions.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'terms-condition-management',
  templateUrl: './terms-condition-management.component.html',
  styleUrls: ['./terms-condition-management.component.css']
})
export class TermsConditionManagementComponent implements OnInit {
  loading: boolean = false;
  hide: boolean = false;
  commondata: any;
  setting_Obj: any = {};
  data: any;
  editformdata = false;
  base_url = environment.url;
  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontsize']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }
  @ViewChild('bannerimageFile') bannerimageFile: any;
  @ViewChild('introimageFile') introimageFile: any;
  @ViewChild('image2') image2: any;
  constructor(private termConditionsService: TermConditionsService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getData();

  }

  getData() {
    return new Promise((resolve, reject) => {
      this.termConditionsService.getTermsCondition({}).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.setting_Obj = JSON.parse(JSON.stringify(res.data));
          }
          else {
            this.editformdata = true;
          }
          return resolve(true);
        },
        (error) => {
          this.commonHelper.showError(error);
          return resolve(false);
        }
      );
    });
  }

  addPrivacyPolicy() {
    let params = {
      pagetitle: this.setting_Obj.pagetitle,
      description: this.setting_Obj.description,
      seotitle: this.setting_Obj.seotitle,
      seodescription: this.setting_Obj.seodescription,
      seokeyword: this.setting_Obj.seokeyword,
    }
    this.loading = true;
    this.termConditionsService.addTermsCondition(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Terms & condition data updated successfully.");
        this.editformdata = false;
        this.getData();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
}




