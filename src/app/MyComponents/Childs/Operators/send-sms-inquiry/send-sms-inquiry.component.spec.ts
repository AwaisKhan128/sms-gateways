import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSMSInquiryComponent } from './send-sms-inquiry.component';

describe('SendSMSInquiryComponent', () => {
  let component: SendSMSInquiryComponent;
  let fixture: ComponentFixture<SendSMSInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendSMSInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSMSInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
