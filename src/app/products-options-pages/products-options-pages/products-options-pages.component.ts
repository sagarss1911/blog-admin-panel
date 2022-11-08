import { Component, OnInit, ElementRef } from '@angular/core';
import { PermissionHelper } from 'src/app/helpers/permissions.helper';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { remove } from "lodash-es";
declare var $: any;
@Component({
  selector: 'products-options-pages',
  templateUrl: './products-options-pages.component.html',
  styleUrls: ['./products-options-pages.component.css'],
})

export class ProductOptionPageComponent implements OnInit {
  public permissions: any = {};
  public activeTabIndex: number = 0;

  constructor(private router: Router,) {

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url == "/expenses/expenses") {
          this.activeTabIndex = 0;
        } else if (event.url == "/expenses/recurring-expenses") {
          this.activeTabIndex = 1;
        }
      };
    });
  }

  ngOnInit(): void { }

  onClickLink(index) {
    this.activeTabIndex = index;
  }
}
