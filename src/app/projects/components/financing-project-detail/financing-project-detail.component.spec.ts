import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingProjectDetailComponent } from './financing-project-detail.component';

describe('FinancingProjectDetailComponent', () => {
  let component: FinancingProjectDetailComponent;
  let fixture: ComponentFixture<FinancingProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancingProjectDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancingProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
