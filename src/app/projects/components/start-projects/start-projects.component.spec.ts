import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartProjectsComponent } from './start-projects.component';

describe('StartProjectsComponent', () => {
  let component: StartProjectsComponent;
  let fixture: ComponentFixture<StartProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
