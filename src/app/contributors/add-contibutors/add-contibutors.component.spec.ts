import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContibutorsComponent } from './add-contibutors.component';

describe('AddContibutorsComponent', () => {
  let component: AddContibutorsComponent;
  let fixture: ComponentFixture<AddContibutorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContibutorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContibutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
