import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderSmsComponent } from './sender-sms.component';

describe('SenderSmsComponent', () => {
  let component: SenderSmsComponent;
  let fixture: ComponentFixture<SenderSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenderSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
