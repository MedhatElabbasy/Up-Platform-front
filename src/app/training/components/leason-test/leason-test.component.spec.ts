import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasonTestComponent } from './leason-test.component';

describe('LeasonTestComponent', () => {
  let component: LeasonTestComponent;
  let fixture: ComponentFixture<LeasonTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeasonTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasonTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
