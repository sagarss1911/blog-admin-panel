import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterOptionsComponent } from './footer-options.component';

describe('FooterOptionsComponent', () => {
  let component: FooterOptionsComponent;
  let fixture: ComponentFixture<FooterOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
