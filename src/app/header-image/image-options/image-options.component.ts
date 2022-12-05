import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-image-options',
  templateUrl: './image-options.component.html',
  styleUrls: ['./image-options.component.css'],
})
export class ImageOptionsComponent implements OnInit {
  public permissions: any = {};
  public activeTabIndex: number = 0;
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/expenses/expenses') {
          this.activeTabIndex = 0;
        } else if (event.url == '/expenses/recurring-expenses') {
          this.activeTabIndex = 1;
        }
      }
    });
  }

  ngOnInit(): void {}

  onClickLink(index) {
    this.activeTabIndex = index;
  }
}
