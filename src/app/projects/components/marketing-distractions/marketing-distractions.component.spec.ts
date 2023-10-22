import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingDistractionsComponent } from './marketing-distractions.component';

describe('MarketingDistractionsComponent', () => {
  let component: MarketingDistractionsComponent;
  let fixture: ComponentFixture<MarketingDistractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingDistractionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingDistractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
