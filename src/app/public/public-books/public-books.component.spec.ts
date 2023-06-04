import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBooksComponent } from './public-books.component';

describe('PublicBooksComponent', () => {
  let component: PublicBooksComponent;
  let fixture: ComponentFixture<PublicBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicBooksComponent]
    });
    fixture = TestBed.createComponent(PublicBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
