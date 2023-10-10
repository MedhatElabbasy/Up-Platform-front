import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesSocialComponent } from './services-social.component';

describe('ServicesSocialComponent', () => {
  let component: ServicesSocialComponent;
  let fixture: ComponentFixture<ServicesSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
