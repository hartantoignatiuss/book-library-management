import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalBookLandingComponent } from './rental-book-landing.component';

describe('RentalBookLandingComponent', () => {
  let component: RentalBookLandingComponent;
  let fixture: ComponentFixture<RentalBookLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalBookLandingComponent]
    });
    fixture = TestBed.createComponent(RentalBookLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
