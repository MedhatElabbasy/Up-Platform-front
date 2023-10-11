import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTeamDetailsComponent } from './projects-team-details.component';

describe('ProjectsTeamDetailsComponent', () => {
  let component: ProjectsTeamDetailsComponent;
  let fixture: ComponentFixture<ProjectsTeamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsTeamDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
