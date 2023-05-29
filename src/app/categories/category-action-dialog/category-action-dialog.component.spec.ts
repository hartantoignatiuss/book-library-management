import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryActionDialogComponent } from './category-action-dialog.component';

describe('CategoryActionDialogComponent', () => {
  let component: CategoryActionDialogComponent;
  let fixture: ComponentFixture<CategoryActionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryActionDialogComponent]
    });t
    fixture = TestBed.createComponent(CategoryActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
