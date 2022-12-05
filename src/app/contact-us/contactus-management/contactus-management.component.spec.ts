import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusManagementComponent } from './contactus-management.component';

describe('ContactusManagementComponent', () => {
  let component: ContactusManagementComponent;
  let fixture: ComponentFixture<ContactusManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactusManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
