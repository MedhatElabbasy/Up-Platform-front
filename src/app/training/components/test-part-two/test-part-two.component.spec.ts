import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPartTwoComponent } from './test-part-two.component';

describe('TestPartTwoComponent', () => {
  let component: TestPartTwoComponent;
  let fixture: ComponentFixture<TestPartTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestPartTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
