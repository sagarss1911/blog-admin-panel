import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterHeadingManagementComponent } from './footer-heading-management.component';

describe('FooterHeadingManagementComponent', () => {
  let component: FooterHeadingManagementComponent;
  let fixture: ComponentFixture<FooterHeadingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterHeadingManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterHeadingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
