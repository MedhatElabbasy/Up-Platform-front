import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingCostComponent } from './marketing-cost.component';

describe('MarketingCostComponent', () => {
  let component: MarketingCostComponent;
  let fixture: ComponentFixture<MarketingCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingCostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
