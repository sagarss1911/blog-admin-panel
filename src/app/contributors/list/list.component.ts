import { Component, OnInit } from '@angular/core';
import { ContributorsService } from 'src/app/services/contributors.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  data = [];
  base_url = environment.url;
  constructor(private service: ContributorsService) {}

  ngOnInit(): void {
    this.getAllContributtors();
  }

  getAllContributtors() {
    this.service.getContributor().subscribe((res: any) => {
      this.data = JSON.parse(JSON.stringify(res.data.findAll));
    });
  }
}
