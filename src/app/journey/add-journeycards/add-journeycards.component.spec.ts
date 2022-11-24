import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJourneycardsComponent } from './add-journeycards.component';

describe('AddJourneycardsComponent', () => {
  let component: AddJourneycardsComponent;
  let fixture: ComponentFixture<AddJourneycardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJourneycardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJourneycardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
