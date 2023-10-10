import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalCertificateComponent } from './local-certificate.component';

describe('LocalCertificateComponent', () => {
  let component: LocalCertificateComponent;
  let fixture: ComponentFixture<LocalCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalCertificateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
