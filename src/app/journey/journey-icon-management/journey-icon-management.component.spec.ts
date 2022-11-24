import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyIconManagementComponent } from './journey-icon-management.component';

describe('JourneyIconManagementComponent', () => {
  let component: JourneyIconManagementComponent;
  let fixture: ComponentFixture<JourneyIconManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyIconManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyIconManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
