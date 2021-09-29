import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingContactComponent } from './billing-contact.component';

describe('BillingContactComponent', () => {
  let component: BillingContactComponent;
  let fixture: ComponentFixture<BillingContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
