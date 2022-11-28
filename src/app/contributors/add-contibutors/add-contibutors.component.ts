import { Component, OnInit } from '@angular/core';

import { ContributorsService } from 'src/app/services/contributors.service';

@Component({
  selector: 'app-add-contibutors',
  templateUrl: './add-contibutors.component.html',
  styleUrls: ['./add-contibutors.component.css'],
})
export class AddContibutorsComponent implements OnInit {
  blog: any = { colors: [] };
  // base_url = environment.url;

  constructor(private service: ContributorsService) {}
  // blog: any;
  ngOnInit(): void {}

  onClickCancel() {}

  onClickSave(f: any) {
    console.log(f.value);

    let params = {
      userId: localStorage.getItem('user_id'),
      Name: this.blog.Name,
      Email: this.blog.Email,
      instagramLink: this.blog.instagramLink,
      Message: this.blog.Message,
      additional: this.blog.additional,
    };
    console.log(params);

    this.service.addContributor(params).subscribe((res: any) => {
      if (res.status == 200 && res.data) {
        alert('request sent');
      }
    });
  }
}
