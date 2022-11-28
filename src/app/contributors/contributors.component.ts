import { Component, OnInit } from '@angular/core';
import { ContributorsService } from '../services/contributors.service';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css'],
})
export class ContributorsComponent implements OnInit {
  blog: any = { colors: [] };

  constructor(private service: ContributorsService) {}

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

    this.service.addContributor(params).subscribe(() => {});
  }
}
