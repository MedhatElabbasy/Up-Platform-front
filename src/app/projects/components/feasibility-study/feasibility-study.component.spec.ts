import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityStudyComponent } from './feasibility-study.component';

describe('FeasibilityStudyComponent', () => {
  let component: FeasibilityStudyComponent;
  let fixture: ComponentFixture<FeasibilityStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeasibilityStudyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeasibilityStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
