import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesOfConsultationsComponent } from './types-of-consultations.component';

describe('TypesOfConsultationsComponent', () => {
  let component: TypesOfConsultationsComponent;
  let fixture: ComponentFixture<TypesOfConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesOfConsultationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypesOfConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
