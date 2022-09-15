import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesRespondidasComponent } from './actividades-respondidas.component';

describe('ActividadesRespondidasComponent', () => {
  let component: ActividadesRespondidasComponent;
  let fixture: ComponentFixture<ActividadesRespondidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadesRespondidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesRespondidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
