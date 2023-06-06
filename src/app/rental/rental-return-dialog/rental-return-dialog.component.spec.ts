import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalReturnDialogComponent } from './rental-return-dialog.component';

describe('RentalReturnDialogComponent', () => {
  let component: RentalReturnDialogComponent;
  let fixture: ComponentFixture<RentalReturnDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalReturnDialogComponent]
    });
    fixture = TestBed.createComponent(RentalReturnDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
