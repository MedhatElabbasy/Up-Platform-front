import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndCourseComponent } from './end-course.component';

describe('EndCourseComponent', () => {
  let component: EndCourseComponent;
  let fixture: ComponentFixture<EndCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
