import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeActivitiesComponent } from './see-activities.component';

describe('SeeActivitiesComponent', () => {
  let component: SeeActivitiesComponent;
  let fixture: ComponentFixture<SeeActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
