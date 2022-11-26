import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';

import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Router } from '@angular/router';
import { PlaceService } from 'src/app/services/place.service';
import { blogsService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit {
  public places: any = [];
  public modalRef: BsModalRef;
  base_url = environment.url;
  data: any = [];
  blogData: any = [];
  bookmark: any = [];

  res: any = false;
  Category: any;
  constructor(
    public placeService: PlaceService,

    private blogservice: blogsService
  ) {}

  ngOnInit(): void {
    this.getAllFav();
    this.getAllBookmark();
  }
  getAllFav() {
    let id = localStorage.getItem('user_id');
    this.blogservice.getFav(id).subscribe((res: any) => {
      this.data = JSON.parse(JSON.stringify(res.data.slides));
      console.log(this.data, 'fav');
    });
  }

  getAllBookmark() {
    let id = localStorage.getItem('user_id');
    this.blogservice.getBookMark(id).subscribe((res: any) => {
      this.bookmark = JSON.parse(JSON.stringify(res.data.slider));
      console.log(this.bookmark, 'bookmark');
    });
  }
}
