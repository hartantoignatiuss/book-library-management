import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalMainComponent } from './rental-main.component';

describe('RentalMainComponent', () => {
  let component: RentalMainComponent;
  let fixture: ComponentFixture<RentalMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalMainComponent]
    });
    fixture = TestBed.createComponent(RentalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
