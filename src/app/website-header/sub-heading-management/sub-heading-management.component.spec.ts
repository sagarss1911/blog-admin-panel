import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeadingManagementComponent } from './sub-heading-management.component';

describe('SubHeadingManagementComponent', () => {
  let component: SubHeadingManagementComponent;
  let fixture: ComponentFixture<SubHeadingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubHeadingManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubHeadingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
