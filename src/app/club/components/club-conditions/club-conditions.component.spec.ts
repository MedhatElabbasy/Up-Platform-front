import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubConditionsComponent } from './club-conditions.component';

describe('ClubConditionsComponent', () => {
  let component: ClubConditionsComponent;
  let fixture: ComponentFixture<ClubConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubConditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
