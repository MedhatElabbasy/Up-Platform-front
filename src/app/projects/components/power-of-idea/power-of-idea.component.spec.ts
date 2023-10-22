import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerOfIdeaComponent } from './power-of-idea.component';

describe('PowerOfIdeaComponent', () => {
  let component: PowerOfIdeaComponent;
  let fixture: ComponentFixture<PowerOfIdeaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerOfIdeaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerOfIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
