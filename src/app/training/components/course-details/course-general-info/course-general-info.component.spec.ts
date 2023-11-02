import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGeneralInfoComponent } from './course-general-info.component';

describe('CourseGeneralInfoComponent', () => {
  let component: CourseGeneralInfoComponent;
  let fixture: ComponentFixture<CourseGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseGeneralInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
