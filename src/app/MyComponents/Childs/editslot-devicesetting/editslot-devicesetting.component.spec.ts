import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditslotDevicesettingComponent } from './editslot-devicesetting.component';

describe('EditslotDevicesettingComponent', () => {
  let component: EditslotDevicesettingComponent;
  let fixture: ComponentFixture<EditslotDevicesettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditslotDevicesettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditslotDevicesettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
