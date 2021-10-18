import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorConfigurationComponent } from './operator-configuration.component';

describe('OperatorConfigurationComponent', () => {
  let component: OperatorConfigurationComponent;
  let fixture: ComponentFixture<OperatorConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
