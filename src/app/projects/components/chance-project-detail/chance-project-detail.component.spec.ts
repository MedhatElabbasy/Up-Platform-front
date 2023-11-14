import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanceProjectDetailComponent } from './chance-project-detail.component';

describe('ChanceProjectDetailComponent', () => {
  let component: ChanceProjectDetailComponent;
  let fixture: ComponentFixture<ChanceProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChanceProjectDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChanceProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
