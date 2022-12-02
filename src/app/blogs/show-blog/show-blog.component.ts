import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { blogsService } from 'src/app/services/blog.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-show-blog',
  templateUrl: './show-blog.component.html',
  styleUrls: ['./show-blog.component.css'],
})
export class ShowBlogComponent implements OnInit {
  constructor(
    private blogservice: blogsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  loading: boolean = false;
  base_url = environment.url;
  blogId: any;
  table_data: any;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.blogId = params['id'];
    });

    if (this.blogId) {
      this.getBlogsData();
    }
  }

  category(item) {
    this.blogservice.headerClicked.next(item);
    this.router.navigate(['/search']);
  }
  getBlogsData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.blogservice.getBlog(this.blogId).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.table_data = [];

            this.table_data.push(JSON.parse(JSON.stringify(res.data)));
          }
          this.loading = false;
          return resolve(true);
        },
        (error) => {
          this.loading = false;

          return resolve(false);
        }
      );
    });
  }
}
