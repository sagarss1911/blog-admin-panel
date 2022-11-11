import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { remove } from 'lodash-es';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, Subscription } from 'rxjs';
import { CommonHelper } from 'src/app/helpers/common.helper';

import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from 'src/environments/environment';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css'],
})
export class CategoryManagementComponent implements OnInit {
  public loading: boolean = false;

  public filters: any = {};
  public slider_obj: any = {};

  base_url = environment.url;
  public dialogType: string = 'add';

  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public categorylist: any;

  public parent: any;

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getSlidersWithFilters({ page: 1 });
  }
  getSlidersWithFilters(event) {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        filters: {},
        page: event.page,
        limit: event.limit ? event.limit : this.recordLimit,
      };
      this.recordLimit = params.limit;
      if (this.filters.searchtext) {
        params['filters']['searchtext'] = this.filters.searchtext;
      }
      this.categoryService.getAllCategory(params).subscribe(
        (res: any) => {
          console.log(res.data, 'this is get response');

          this.table_data = res.data;
          console.log(this.table_data);
          if (res.status == 200 && res.data.slides) {
            this.table_data = [];

            this.table_data = res.data;
            console.log(this.table_data);

            this.table_data = JSON.parse(JSON.stringify(res.data.slides));
            // this.table_data.forEach((element) => {
            //   element.collections = element.collections.map((a) => {
            //     return a.name;
            //   });
            //   element.category = element.category.map((a) => {
            //     return a.name;
            //   });
            // });
            this.paginationValues.next({
              type: 'page-init',
              page: params.page,
              totalTableRecords: res.data.total_count,
            });
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

  onClickAddCategory() {
    // this.router.navigate(['/admin-users/add-user']);
    this.router.navigate(['/category/add-category']);
  }
  onClickEditCategory(category) {
    this.router.navigate(['/category/edit-category/' + category._id]);
  }

  onClickDeleteCategory(category) {
    console.log(category);
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      class: 'confirmation-modal',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = `Are you sure to delete this ${category.categoryName}?`;
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == 'done') {
        this.loading = true;
        this.categoryService.deleteCategory(category._id).subscribe(
          (res: any) => {
            console.log(res);
            this.loading = false;
            if (res.status == 200) {
              remove(this.table_data, (ub: any) => ub._id == category._id);
              this._toastMessageService.alert(
                'success',
                'Category deleted successfully.'
              );
              this.router.navigate(['/category']);
            }
          },
          (error) => {
            this.loading = false;
            this.commonHelper.showError(error);
          }
        );
      }
      tempSubObj.unsubscribe();
    });
  }
}
