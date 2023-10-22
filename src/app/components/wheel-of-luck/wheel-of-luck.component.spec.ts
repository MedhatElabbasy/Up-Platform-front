import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelOfLuckComponent } from './wheel-of-luck.component';

describe('WheelOfLuckComponent', () => {
  let component: WheelOfLuckComponent;
  let fixture: ComponentFixture<WheelOfLuckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WheelOfLuckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WheelOfLuckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
