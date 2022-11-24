import { Component, OnInit } from '@angular/core';
import { blogsService } from '../services/blog.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css'],
})
export class SuggestionsComponent implements OnInit {
  constructor(private blogservice: blogsService) {}
  base_url = environment.url;
  data: any = [];
  blogData: any = [];
  bookmark: any = [];
  ngOnInit(): void {
    this.getAllFav();
    this.getAllBookmark();
  }

  getAllFav() {
    let id = localStorage.getItem('user_id');
    this.blogservice.getFav(id).subscribe((res: any) => {
      this.data = JSON.parse(JSON.stringify(res.data.slides));
    });
  }

  getAllBookmark() {
    let id = localStorage.getItem('user_id');
    this.blogservice.getBookMark(id).subscribe((res: any) => {
      this.bookmark = JSON.parse(JSON.stringify(res.data.slider));
    });
  }
}
