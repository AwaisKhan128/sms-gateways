import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendUSSDInquiryComponent } from './send-ussd-inquiry.component';

describe('SendUSSDInquiryComponent', () => {
  let component: SendUSSDInquiryComponent;
  let fixture: ComponentFixture<SendUSSDInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendUSSDInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendUSSDInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
