import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureBlogsComponent } from './future-blogs.component';

describe('FutureBlogsComponent', () => {
  let component: FutureBlogsComponent;
  let fixture: ComponentFixture<FutureBlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutureBlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
