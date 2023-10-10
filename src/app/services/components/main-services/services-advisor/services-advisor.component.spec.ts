import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesAdvisorComponent } from './services-advisor.component';

describe('ServicesAdvisorComponent', () => {
  let component: ServicesAdvisorComponent;
  let fixture: ComponentFixture<ServicesAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesAdvisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
