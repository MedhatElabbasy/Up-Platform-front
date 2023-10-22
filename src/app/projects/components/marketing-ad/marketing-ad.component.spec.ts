import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingAdComponent } from './marketing-ad.component';

describe('MarketingAdComponent', () => {
  let component: MarketingAdComponent;
  let fixture: ComponentFixture<MarketingAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
