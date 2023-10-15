import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityStudyFormComponent } from './feasibility-study-form.component';

describe('FeasibilityStudyFormComponent', () => {
  let component: FeasibilityStudyFormComponent;
  let fixture: ComponentFixture<FeasibilityStudyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeasibilityStudyFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeasibilityStudyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
