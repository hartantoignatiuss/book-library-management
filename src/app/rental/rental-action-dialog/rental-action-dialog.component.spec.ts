import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalActionDialogComponent } from './rental-action-dialog.component';

describe('RentalActionDialogComponent', () => {
  let component: RentalActionDialogComponent;
  let fixture: ComponentFixture<RentalActionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalActionDialogComponent]
    });
    fixture = TestBed.createComponent(RentalActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
