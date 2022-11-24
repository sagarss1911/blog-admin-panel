import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsOptionsComponent } from './about-us-options.component';

describe('AboutUsOptionsComponent', () => {
  let component: AboutUsOptionsComponent;
  let fixture: ComponentFixture<AboutUsOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutUsOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
