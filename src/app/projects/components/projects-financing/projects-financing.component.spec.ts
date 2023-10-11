import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsFinancingComponent } from './projects-financing.component';

describe('ProjectsFinancingComponent', () => {
  let component: ProjectsFinancingComponent;
  let fixture: ComponentFixture<ProjectsFinancingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsFinancingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsFinancingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
