import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderRemoteSmsComponent } from './sender-remote-sms.component';

describe('SenderRemoteSmsComponent', () => {
  let component: SenderRemoteSmsComponent;
  let fixture: ComponentFixture<SenderRemoteSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenderRemoteSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderRemoteSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
