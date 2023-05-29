import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackDeleteDialogComponent } from './rack-delete-dialog.component';

describe('RackDeleteDialogComponent', () => {
  let component: RackDeleteDialogComponent;
  let fixture: ComponentFixture<RackDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RackDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(RackDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
