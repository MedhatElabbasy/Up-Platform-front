import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesScheduleComponent } from './activities-schedule.component';

describe('ActivitiesScheduleComponent', () => {
  let component: ActivitiesScheduleComponent;
  let fixture: ComponentFixture<ActivitiesScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
