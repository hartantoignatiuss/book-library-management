import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacksMainComponent } from './racks-main.component';

describe('RacksMainComponent', () => {
  let component: RacksMainComponent;
  let fixture: ComponentFixture<RacksMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacksMainComponent]
    });
    fixture = TestBed.createComponent(RacksMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
