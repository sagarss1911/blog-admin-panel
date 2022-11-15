import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

// import { ProductService } from 'src/app/services/product.service';
// import { CommonService } from 'src/app/services/common.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex } from 'lodash-es';
import { blogsService } from 'src/app/services/blog.service';
// import { Editor } from 'ngx-editor';
import { SubscriberService } from 'src/app/services/subscriber.service';
import { CategoryService } from 'src/app/services/category.service';
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
    private category: CategoryService
  ) {}

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
  //  get category api
  getCategory() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        page: 1,
        limit: 100,
      };
      this.category.getAllCategory(params).subscribe(
        (res: any) => {
          console.log(res);

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
  // get subscriber
  getSubscribers() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        page: 1,
        limit: 100,
      };
      this.subscriber.getAllSubscriber(params).subscribe(
        (res: any) => {
          console.log(res);
          this.user = [];
          if (res.status == 200 && res.data.subscriberList) {
            this.user = JSON.parse(JSON.stringify(res.data.subscriberList));
            this.user = this.user.map((a) => {
              return { _id: a._id, name: a.subscriberName };
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
  setCategory(save: any) {}
  keyUp() {
    // this.higlight = [];
    // this.blog.categoryIds.forEach((element) => {
    //   this.higlight.push(element);
    // });
    this.sam = [];
    this.sam = this.blog.categoryIds.map((a) => {
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
            this.blog.productname = res.data.name;
            this.already_uploadedurls = res.data.option_images
              ? res.data.option_images
              : [];
            this.sam = [];
            this.sam.push(res.data.highlightCategory);
            this.sam = this.sam.map((a) => {
              return { name: a };
            });
            this.blog.higlight = this.sam[0].name;
            this.blog.selectedCategory = res.data.category;
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
  // post data
  onClickSave(f: any) {
    const data = new FormData();
    this.uploaded_files = [];
    if (this.blog.productImageFile) {
      data.append('image', this.blog.productImageFile);
    }
    // this.blog.categoryIds = '';
    let dataa = [];
    this.blog.categoryIds.forEach((element) => {
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
      highlight: this.blog.higlight,
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
