import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { blogsService } from 'src/app/services/blog.service';
@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css'],
})
export class BlogManagementComponent implements OnInit {
  public loading: boolean = false;
  public filters: any = {};
  public slider_obj: any = {};
  public dialogType: string = 'add';
  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public recordLimit: number = 2;
  public modalRef: BsModalRef;
  base_url = environment.url;
  constructor(
    private blogservice: blogsService,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private modalService: BsModalService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAllData({ page: 1 });
  }

  getAllData(event) {
    // this.loading = true;
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
      this.blogservice.getAllBlogs(params).subscribe(
        (res: any) => {
          console.log(res);

          if (res.status == 200 && res.data.slides) {
            this.table_data = [];
            this.table_data = JSON.parse(JSON.stringify(res.data.slides));
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

  onClickAddBlog() {
    this.router.navigate(['/blogs/add-blog']);
  }
  onClickEditBlog(blog) {
    this.router.navigate(['/blogs/edit-blog/' + blog._id]);
  }
  onClickDeleteBlog(blog) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, {
      class: 'confirmation-modal',
      backdrop: 'static',
      keyboard: false,
    });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = `Are you sure to delete ${blog.title}?`;
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == 'done') {
        this.loading = true;
        this.blogservice.deleteBlogs(blog._id).subscribe(
          (res: any) => {
            this.loading = false;
            if (res.status == 200) {
              remove(this.table_data, (ub: any) => ub._id == blog._id);
              this._toastMessageService.alert(
                'success',
                'Product deleted successfully.'
              );
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
