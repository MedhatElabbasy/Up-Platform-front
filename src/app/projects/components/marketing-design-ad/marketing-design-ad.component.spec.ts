import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingDesignAdComponent } from './marketing-design-ad.component';

describe('MarketingDesignAdComponent', () => {
  let component: MarketingDesignAdComponent;
  let fixture: ComponentFixture<MarketingDesignAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingDesignAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingDesignAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
