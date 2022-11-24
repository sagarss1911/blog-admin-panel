import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJourneyIconsComponent } from './add-journey-icons.component';

describe('AddJourneyIconsComponent', () => {
  let component: AddJourneyIconsComponent;
  let fixture: ComponentFixture<AddJourneyIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJourneyIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJourneyIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
