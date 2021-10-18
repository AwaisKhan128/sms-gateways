import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUSSDInquiryComponent } from './add-ussd-inquiry.component';

describe('AddUSSDInquiryComponent', () => {
  let component: AddUSSDInquiryComponent;
  let fixture: ComponentFixture<AddUSSDInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUSSDInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUSSDInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
