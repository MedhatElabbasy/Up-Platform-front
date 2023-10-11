import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTeamFormComponent } from './projects-team-form.component';

describe('ProjectsTeamFormComponent', () => {
  let component: ProjectsTeamFormComponent;
  let fixture: ComponentFixture<ProjectsTeamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsTeamFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
