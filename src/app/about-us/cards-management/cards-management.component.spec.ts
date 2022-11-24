import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsManagementComponent } from './cards-management.component';

describe('CardsManagementComponent', () => {
  let component: CardsManagementComponent;
  let fixture: ComponentFixture<CardsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
