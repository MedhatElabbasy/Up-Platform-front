import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerOfIdeaDetailsComponent } from './power-of-idea-details.component';

describe('PowerOfIdeaDetailsComponent', () => {
  let component: PowerOfIdeaDetailsComponent;
  let fixture: ComponentFixture<PowerOfIdeaDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerOfIdeaDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerOfIdeaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
