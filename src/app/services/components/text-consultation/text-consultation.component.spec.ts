import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextConsultationComponent } from './text-consultation.component';

describe('TextConsultationComponent', () => {
  let component: TextConsultationComponent;
  let fixture: ComponentFixture<TextConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextConsultationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
