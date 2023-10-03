import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsLibraryComponent } from './skills-library.component';

describe('SkillsLibraryComponent', () => {
  let component: SkillsLibraryComponent;
  let fixture: ComponentFixture<SkillsLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
