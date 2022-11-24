import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitePlacesComponent } from './website-places.component';

describe('WebsitePlacesComponent', () => {
  let component: WebsitePlacesComponent;
  let fixture: ComponentFixture<WebsitePlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsitePlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsitePlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
