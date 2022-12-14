import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex } from 'lodash-es';
import { blogsService } from 'src/app/services/blog.service';

import { SubscriberService } from 'src/app/services/subscriber.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserRegisterService } from 'src/app/services/user-register.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blog: any = { colors: [] };
  base_url = environment.url;
  loading: boolean = false;
  collection_data = [];
  urls = [];
  already_uploadedurls = [];
  remaining_url = [];
  uploaded_files = [];
  category_data = [];
  color_data = [];
  thickness_data = [];
  length_data = [];
  files = [];
  material_data = [];
  type = 'add';
  imgclr = false;
  err = false;
  Category: any[];
  higlight: any[] = [];
  selectedCities: any[];
  user: any[] = [];
  public modalRef: BsModalRef;
  sam: { name: any }[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private blogsService: blogsService,
    private _toastMessageService: ToastMessageService,
    private sanitizer: DomSanitizer,
    private commonHelper: CommonHelper,
    private subscriber: SubscriberService,
    private userService: UserRegisterService,
    private category: CategoryService
  ) {}

  // for editor
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

  ngOnInit() {
    this.getSubscribers();
    this.getCategory();
    this.blog._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';

    if (this.blog._id) {
      this.type = 'edit';
      this.getBlogsData();
    }
  }

  //  geted category to add category in blogs
  getCategory() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        page: 1,
        limit: 100,
      };
      this.category.getAllCategory(params).subscribe(
        (res: any) => {
          this.Category = [];
          if (res.status == 200 && res.data.categoryList) {
            this.Category = JSON.parse(JSON.stringify(res.data.categoryList));
            this.Category = this.Category.map((a) => {
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

  // get subscriber to add wordsBy and imageby blohBy users
  getSubscribers() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        page: 1,
        limit: 100,
      };
      this.userService.getAllUser(params).subscribe(
        (res: any) => {
          this.user = [];
          if (res.status == 200 && res.data.userList) {
            this.user = JSON.parse(JSON.stringify(res.data.userList));
            this.user = this.user.map((a) => {
              return { _id: a._id, name: a.firstName + '' + a.lastName };
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

  // to push selected category to highlight dropdown
  setCategory(save: any) {}
  keyUp() {
    this.sam = [];
    this.sam = this.blog.Category.map((a) => {
      return { name: a.name };
    });
  }

  getBlogsData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.blogsService.getBlog(this.blog._id).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.blog = res.data;

            this.blog.wordsBy = this.blog.wordsBy.map((a: any) => {
              return { _id: a._id, name: a.subscriberName };
            });
            this.sam = [];
            this.sam.push(res.data.highlightCategory);
            this.sam = this.sam.map((a) => {
              return { name: a };
            });
            this.blog.higlight = res.data.highlightCategory;
            this.blog.Category = JSON.parse(
              JSON.stringify(res.data.categoryIds)
            );
            this.blog.Category = this.blog.Category.map((a) => {
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

  // generating slug
  generateSlug(event) {
    this.blog.slug = event.target.value
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  // image upload
  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.blog.productImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.blog.productImageFile = event.target.files[0];
      this.blog.newImageUploaded = true;
    }
  }
  // clear file
  clearCLFile() {
    this.blog.productImageUrl = '';
    this.blog.productImageFile = null;
    this.blog.newImageUploaded = false;
  }

  // cancel image
  onClickCancel() {
    this.router.navigate(['/products-options-pages/products']);
  }

  // post blog data
  onClickSave(f: any) {
    const data = new FormData();
    this.uploaded_files = [];
    if (this.blog.productImageFile) {
      data.append('image', this.blog.productImageFile);
    }

    let dataa = [];
    this.blog.Category.forEach((element) => {
      dataa.push(element._id);
    });

    let params = {
      _id: this.blog._id,
      title: this.blog.title,
      slug: this.blog.slug,
      smallDiscription: this.blog.smallDiscription,
      newImageUploaded: this.blog.newImageUploaded,
      fullDiscription: this.blog.fullDiscription,
      seoTitle: this.blog.seoTitle,
      seoDescription: this.blog.seoDescription,
      seoKeyword: this.blog.seoKeyword,
      categoryIds: dataa,
      feature: this.blog.feature,
      highlight: this.blog.highlightCategory,
      createdBy: this.blog.createdBy,
      imageBy: this.blog.imageBy,
      wordsBy: this.blog.wordsBy,
    };
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.blogsService.addBlogs(data).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200 && res.data) {
          this._toastMessageService.alert(
            'success',
            'Product added successfully.'
          );
          this.router.navigate(['/blogs']);
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
