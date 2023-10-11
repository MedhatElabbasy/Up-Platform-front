import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsChanceComponent } from './projects-chance.component';

describe('ProjectsChanceComponent', () => {
  let component: ProjectsChanceComponent;
  let fixture: ComponentFixture<ProjectsChanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsChanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsChanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
