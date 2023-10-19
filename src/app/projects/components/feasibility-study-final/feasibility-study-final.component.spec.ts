import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityStudyFinalComponent } from './feasibility-study-final.component';

describe('FeasibilityStudyFinalComponent', () => {
  let component: FeasibilityStudyFinalComponent;
  let fixture: ComponentFixture<FeasibilityStudyFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeasibilityStudyFinalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeasibilityStudyFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
