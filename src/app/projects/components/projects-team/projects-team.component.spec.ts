import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTeamComponent } from './projects-team.component';

describe('ProjectsTeamComponent', () => {
  let component: ProjectsTeamComponent;
  let fixture: ComponentFixture<ProjectsTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
