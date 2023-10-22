import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDesignComponent } from './projects-design.component';

describe('ProjectsDesignComponent', () => {
  let component: ProjectsDesignComponent;
  let fixture: ComponentFixture<ProjectsDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsDesignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
