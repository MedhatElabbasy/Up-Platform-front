import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantbiographyComponent } from './consultantbiography.component';

describe('ConsultantbiographyComponent', () => {
  let component: ConsultantbiographyComponent;
  let fixture: ComponentFixture<ConsultantbiographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultantbiographyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultantbiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
