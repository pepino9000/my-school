import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeCoursesComponent } from './see-courses.component';

describe('SeeCoursesComponent', () => {
  let component: SeeCoursesComponent;
  let fixture: ComponentFixture<SeeCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
