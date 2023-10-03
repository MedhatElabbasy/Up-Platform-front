import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPathsComponent } from './training-paths.component';

describe('TrainingPathsComponent', () => {
  let component: TrainingPathsComponent;
  let fixture: ComponentFixture<TrainingPathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingPathsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
