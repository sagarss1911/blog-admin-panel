import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageOptionsComponent } from './image-options.component';

describe('ImageOptionsComponent', () => {
  let component: ImageOptionsComponent;
  let fixture: ComponentFixture<ImageOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
