import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamProjectDetailComponent } from './team-project-detail.component';

describe('TeamProjectDetailComponent', () => {
  let component: TeamProjectDetailComponent;
  let fixture: ComponentFixture<TeamProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamProjectDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
