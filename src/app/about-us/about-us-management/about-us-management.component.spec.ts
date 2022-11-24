import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsManagementComponent } from './about-us-management.component';

describe('AboutUsManagementComponent', () => {
  let component: AboutUsManagementComponent;
  let fixture: ComponentFixture<AboutUsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutUsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
