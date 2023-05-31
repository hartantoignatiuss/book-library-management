import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberActionDialogComponent } from './member-action-dialog.component';

describe('MemberActionDialogComponent', () => {
  let component: MemberActionDialogComponent;
  let fixture: ComponentFixture<MemberActionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberActionDialogComponent]
    });
    fixture = TestBed.createComponent(MemberActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
