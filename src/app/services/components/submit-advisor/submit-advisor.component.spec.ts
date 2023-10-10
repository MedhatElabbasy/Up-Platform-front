import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitAdvisorComponent } from './submit-advisor.component';

describe('SubmitAdvisorComponent', () => {
  let component: SubmitAdvisorComponent;
  let fixture: ComponentFixture<SubmitAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitAdvisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
