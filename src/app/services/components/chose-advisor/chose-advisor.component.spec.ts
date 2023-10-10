import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoseAdvisorComponent } from './chose-advisor.component';

describe('ChoseAdvisorComponent', () => {
  let component: ChoseAdvisorComponent;
  let fixture: ComponentFixture<ChoseAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoseAdvisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoseAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
