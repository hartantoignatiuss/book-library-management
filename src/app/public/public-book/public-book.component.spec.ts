import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBookComponent } from './public-book.component';

describe('PublicBookComponent', () => {
  let component: PublicBookComponent;
  let fixture: ComponentFixture<PublicBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicBookComponent]
    });
    fixture = TestBed.createComponent(PublicBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
