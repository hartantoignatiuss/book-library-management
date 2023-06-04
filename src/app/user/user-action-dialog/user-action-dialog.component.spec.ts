import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionDialogComponent } from './user-action-dialog.component';

describe('UserActionDialogComponent', () => {
  let component: UserActionDialogComponent;
  let fixture: ComponentFixture<UserActionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserActionDialogComponent]
    });
    fixture = TestBed.createComponent(UserActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
