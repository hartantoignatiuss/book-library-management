import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberNonactiveDialogComponent } from './member-nonactive-dialog.component';

describe('MemberNonactiveDialogComponent', () => {
  let component: MemberNonactiveDialogComponent;
  let fixture: ComponentFixture<MemberNonactiveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberNonactiveDialogComponent]
    });
    fixture = TestBed.createComponent(MemberNonactiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
