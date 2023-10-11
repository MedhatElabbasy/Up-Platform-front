import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsSimulationComponent } from './projects-simulation.component';

describe('ProjectsSimulationComponent', () => {
  let component: ProjectsSimulationComponent;
  let fixture: ComponentFixture<ProjectsSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsSimulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
