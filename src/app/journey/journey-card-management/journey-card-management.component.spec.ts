import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyCardManagementComponent } from './journey-card-management.component';

describe('JourneyCardManagementComponent', () => {
  let component: JourneyCardManagementComponent;
  let fixture: ComponentFixture<JourneyCardManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyCardManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyCardManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
