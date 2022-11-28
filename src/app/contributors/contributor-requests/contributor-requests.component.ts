import { Component, OnInit } from '@angular/core';
import { blogsService } from 'src/app/services/blog.service';
import { ContributorsService } from 'src/app/services/contributors.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contributor-requests',
  templateUrl: './contributor-requests.component.html',
  styleUrls: ['./contributor-requests.component.css'],
})
export class ContributorRequestsComponent implements OnInit {
  constructor(private service: ContributorsService) {}
  base_url = environment.url;
  data: any = [];
  ngOnInit(): void {
    this.gerContributtors();
  }
  gerContributtors() {
    this.service.getContributor().subscribe((res: any) => {
      this.data = JSON.parse(JSON.stringify(res.data));

      console.log(this.data);
    });
  }

  accepRequest(item) {
    console.log(item);
    console.log('afreen');
    let params = {
      _id: item._id,
      string: 'accept',
    };

    this.service.addContributor(params).subscribe((res) => {
      console.log(res);
    });
  }
  onClickDeleteBlog(item) {
    console.log(item);
    console.log('afreen');
    let params = {
      _id: item._id,
      string: 'delete',
    };

    this.service.addContributor(params).subscribe((res) => {
      console.log(res);
    });
  }
}
