import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksActionDialogComponent } from './books-action-dialog.component';

describe('BooksActionDialogComponent', () => {
  let component: BooksActionDialogComponent;
  let fixture: ComponentFixture<BooksActionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksActionDialogComponent]
    });
    fixture = TestBed.createComponent(BooksActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
