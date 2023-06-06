import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBookItemComponent } from './public-book-item.component';

describe('PublicBookItemComponent', () => {
  let component: PublicBookItemComponent;
  let fixture: ComponentFixture<PublicBookItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicBookItemComponent]
    });
    fixture = TestBed.createComponent(PublicBookItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
