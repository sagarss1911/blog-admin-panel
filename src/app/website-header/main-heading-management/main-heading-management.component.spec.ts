import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeadingManagementComponent } from './main-heading-management.component';

describe('MainHeadingManagementComponent', () => {
  let component: MainHeadingManagementComponent;
  let fixture: ComponentFixture<MainHeadingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHeadingManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHeadingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
