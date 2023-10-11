import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDepartmentComponent } from './projects-department.component';

describe('ProjectsDepartmentComponent', () => {
  let component: ProjectsDepartmentComponent;
  let fixture: ComponentFixture<ProjectsDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
