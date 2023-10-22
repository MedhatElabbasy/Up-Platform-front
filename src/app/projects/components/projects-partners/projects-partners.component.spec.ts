import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPartnersComponent } from './projects-partners.component';

describe('ProjectsPartnersComponent', () => {
  let component: ProjectsPartnersComponent;
  let fixture: ComponentFixture<ProjectsPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsPartnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
