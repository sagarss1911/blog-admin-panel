import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';
import { JourneyService } from 'src/app/services/journey.service';
@Component({
  selector: 'app-add-journeycards',
  templateUrl: './add-journeycards.component.html',
  styleUrls: ['./add-journeycards.component.css'],
})
export class AddJourneycardsComponent implements OnInit {
  public filters: any = {};
  public dialogType: string = 'add';
  public paginationValues: Subject<any> = new Subject();
  public recordLimit: number = 10;
  journey: any = {};
  base_url = environment.url;
  loading: boolean = false;
  urls = [];
  files = [];
  type = 'add';
  err = false;
  @ViewChild('journeyImageFile') journeyImageFile: any;
  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontsize']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'hr']],
    ],
    fontNames: [
      'Helvetica',
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'Roboto',
      'Times',
    ],
  };
  public modalRef: BsModalRef;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper,
    private JourneyService: JourneyService
  ) {}

  ngOnInit() {
    this.journey._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';
    if (this.journey._id) {
      this.type = 'edit';
      this.getJourneyCardsData();
    }
  }
  getJourneyCardsData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.JourneyService.getJourneyCards(this.journey._id).subscribe(
        (res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data) {
            this.journey = res.data;
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

  onClickCancel() {
    this.router.navigate(['/journeys/journeyCardManagement']);
  }
  onClickSave() {
    let params = {
      _id: this.journey._id,
      cardDescription: this.journey.cardDescription,
      cardTitle: this.journey.cardTitle,
    };
    this.loading = true;
    this.JourneyService.addJourneyCards(params).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200 && res.data) {
          this._toastMessageService.alert(
            'success',
            'About Us added successfully.'
          );
          this.router.navigate(['/journeys/journeyCardManagement']);
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
