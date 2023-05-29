import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackActionDialogComponent } from './rack-action-dialog.component';

describe('RackActionDialogComponent', () => {
  let component: RackActionDialogComponent;
  let fixture: ComponentFixture<RackActionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RackActionDialogComponent]
    });
    fixture = TestBed.createComponent(RackActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
