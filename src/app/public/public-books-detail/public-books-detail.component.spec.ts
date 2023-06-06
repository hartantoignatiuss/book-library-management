import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBooksDetailComponent } from './public-books-detail.component';

describe('PublicBooksDetailComponent', () => {
  let component: PublicBooksDetailComponent;
  let fixture: ComponentFixture<PublicBooksDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicBooksDetailComponent]
    });
    fixture = TestBed.createComponent(PublicBooksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
