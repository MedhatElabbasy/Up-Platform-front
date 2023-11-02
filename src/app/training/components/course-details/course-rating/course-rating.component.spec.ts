import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseRatingComponent } from './course-rating.component';

describe('CourseRatingComponent', () => {
  let component: CourseRatingComponent;
  let fixture: ComponentFixture<CourseRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
