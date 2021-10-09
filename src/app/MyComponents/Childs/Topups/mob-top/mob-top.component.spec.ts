import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobTopComponent } from './mob-top.component';

describe('MobTopComponent', () => {
  let component: MobTopComponent;
  let fixture: ComponentFixture<MobTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
