import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginActionDialogComponent } from './login-action-dialog.component';

describe('LoginActionDialogComponent', () => {
  let component: LoginActionDialogComponent;
  let fixture: ComponentFixture<LoginActionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginActionDialogComponent]
    });
    fixture = TestBed.createComponent(LoginActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
