import { Component, OnInit } from '@angular/core';

import { ContributorsService } from 'src/app/services/contributors.service';

@Component({
  selector: 'app-add-contibutors',
  templateUrl: './add-contibutors.component.html',
  styleUrls: ['./add-contibutors.component.css'],
})
export class AddContibutorsComponent implements OnInit {
  blog: any = { colors: [] };

  constructor(private service: ContributorsService) {}
  // blog: any;
  ngOnInit(): void {}

  onClickCancel() {}

  onClickSave(f: any) {
    let params = {
      userId: localStorage.getItem('user_id'),
      Name: this.blog.Name,
      Email: this.blog.Email,
      instagramLink: this.blog.instagramLink,
      Message: this.blog.Message,
      additional: this.blog.additional,
    };

    this.service.addContributor(params).subscribe((res: any) => {
      if (res.status == 200 && res.data) {
        alert('request sent');
      }
    });
  }
}
