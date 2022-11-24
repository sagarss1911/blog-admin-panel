import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPlaceComponent } from './featured-place.component';

describe('FeaturedPlaceComponent', () => {
  let component: FeaturedPlaceComponent;
  let fixture: ComponentFixture<FeaturedPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
