import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPathComponent } from './selected-path.component';

describe('SelectedPathComponent', () => {
  let component: SelectedPathComponent;
  let fixture: ComponentFixture<SelectedPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedPathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
