import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { CollectionService } from 'src/app/services/Collection.service';
import { ProductService } from 'src/app/services/product.service';
import { CommonService } from 'src/app/services/common.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex } from 'lodash-es';
import { blogsService } from 'src/app/services/blog.service';
// import { Editor } from 'ngx-editor';

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
    private commonHelper: CommonHelper
  ) {
    this.Category = [
      { _id: 1, name: 'cultural' },
      { _id: 2, name: 'food' },
      { _id: 3, name: 'Lifestyle' },
      { _id: 4, name: 'Fashion' },
    ];
    this.user = [
      { _id: 1, name: 'sana' },
      { _id: 2, name: 'shaz' },
      { _id: 3, name: 'sachin' },
      { _id: 4, name: 'afreen' },
    ];
  }

  ngOnInit() {
    this.blog._id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : '';

    if (this.blog._id) {
      this.type = 'edit';
      this.getProductData();
    }
  }

  setCategory(save: any) {}
  keyUp() {
    this.higlight = [];
    this.blog.categoryIds.forEach((element) => {
      this.higlight.push(element);
    });
    this.sam = [];
    this.sam = this.higlight.map((a) => {
      return { name: a };
    });
  }
  getProductData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.blogsService.getBlog({ _id: this.blog._id }).subscribe(
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

  generateSlug(event) {
    this.blog.slug = event.target.value
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

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

  clearCLFile() {
    this.blog.productImageUrl = '';
    this.blog.productImageFile = null;
    this.blog.newImageUploaded = false;
  }

  onClickCancel() {
    this.router.navigate(['/products-options-pages/products']);
  }
  onClickSave(f: any) {
    const data = new FormData();
    this.uploaded_files = [];
    if (this.blog.productImageFile) {
      data.append('image', this.blog.productImageFile);
    }

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
      categoryIds: this.blog.categoryIds,
      highlight: this.blog.higlight,
      createdBy: this.blog.cteatedBy,
      imageBy: this.blog.ImageBy,
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
