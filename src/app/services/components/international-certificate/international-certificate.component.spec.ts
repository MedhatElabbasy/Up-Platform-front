import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalCertificateComponent } from './international-certificate.component';

describe('InternationalCertificateComponent', () => {
  let component: InternationalCertificateComponent;
  let fixture: ComponentFixture<InternationalCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationalCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
