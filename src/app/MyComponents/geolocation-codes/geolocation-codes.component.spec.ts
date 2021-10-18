import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationCodesComponent } from './geolocation-codes.component';

describe('GeolocationCodesComponent', () => {
  let component: GeolocationCodesComponent;
  let fixture: ComponentFixture<GeolocationCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeolocationCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocationCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
