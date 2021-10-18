import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSMSInquiryComponent } from './add-sms-inquiry.component';

describe('AddSMSInquiryComponent', () => {
  let component: AddSMSInquiryComponent;
  let fixture: ComponentFixture<AddSMSInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSMSInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSMSInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
