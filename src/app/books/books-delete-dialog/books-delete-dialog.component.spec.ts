import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDeleteDialogComponent } from './books-delete-dialog.component';

describe('BooksDeleteDialogComponent', () => {
  let component: BooksDeleteDialogComponent;
  let fixture: ComponentFixture<BooksDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(BooksDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
