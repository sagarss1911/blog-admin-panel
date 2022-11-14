import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { CategoryService } from 'src/app/services/category.service';

import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from 'src/environments/environment';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  category: any = [];
  base_url = environment.url;
  loading: boolean = false;
  urls = [];
  already_uploadedurls = [];
  remaining_url = [];
  uploaded_files = [];
  category_data: any;
  files = [];
  type = 'add';
  imgclr = false;
  err = false;
  parentCategory: any;
  public modalRef: BsModalRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer,
    private commonHelper: CommonHelper,
    private categoryService: CategoryService
  ) {}
  ngOnInit() {
    this.category._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';
    if (this.category._id) {
      this.type = 'edit';

      this.getCategoryData();
    }

    this.getAllCategory();
  }

  // Get category by _id
  getCategoryData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.categoryService.getCategory({ _id: this.category._id }).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.category = [];
            this.category = res.data[0];
            console.log(res.data);
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

  //Get complete list of  category
  getAllCategory() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        page: 1,
        limit: 100,
      };
      this.categoryService.getAllCategory(params).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.category_data = [];
            this.category_data = res.data.categoryList;

            this.parentCategory = this.category_data.map((a: any) => {
              return { _id: a._id, name: a.categoryName };
            });
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
    this.router.navigate(['/category']);
  }

  //Add Category
  onClickSave() {
    let data = {
      _id: this.category._id,
      parentCategoryId: this.category.parentCategoryId,
      categoryName: this.category.categoryName,
      seoTitle: this.category.seoTitle,
      seoDescription: this.category.seoDescription,
      seoKeyword: this.category.seoKeyword,
    };

    this.loading = true;
    this.categoryService.addCategory(data).subscribe(
      (res: any) => {
        this.category_data = res.data.categoryName;

        this.loading = false;
        if (res.status == 200 && res.data) {
          this._toastMessageService.alert(
            'success',
            'category added successfully.'
          );
          this.router.navigate(['/category']);
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
