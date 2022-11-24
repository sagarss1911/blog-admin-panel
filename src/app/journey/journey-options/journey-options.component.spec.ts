import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyOptionsComponent } from './journey-options.component';

describe('JourneyOptionsComponent', () => {
  let component: JourneyOptionsComponent;
  let fixture: ComponentFixture<JourneyOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
