import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartProjectsSimulationComponent } from './start-projects-simulation.component';

describe('StartProjectsSimulationComponent', () => {
  let component: StartProjectsSimulationComponent;
  let fixture: ComponentFixture<StartProjectsSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartProjectsSimulationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartProjectsSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
