import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteInfoLinksComponent } from './website-info-links.component';

describe('WebsiteInfoLinksComponent', () => {
  let component: WebsiteInfoLinksComponent;
  let fixture: ComponentFixture<WebsiteInfoLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteInfoLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteInfoLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
