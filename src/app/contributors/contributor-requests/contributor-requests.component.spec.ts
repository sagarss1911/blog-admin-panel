import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorRequestsComponent } from './contributor-requests.component';

describe('ContributorRequestsComponent', () => {
  let component: ContributorRequestsComponent;
  let fixture: ComponentFixture<ContributorRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributorRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
