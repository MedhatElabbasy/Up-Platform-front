import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersProjectDetailsComponent } from './partners-project-details.component';

describe('PartnersProjectDetailsComponent', () => {
  let component: PartnersProjectDetailsComponent;
  let fixture: ComponentFixture<PartnersProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnersProjectDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnersProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
