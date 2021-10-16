import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderMmsComponent } from './sender-mms.component';

describe('SenderMmsComponent', () => {
  let component: SenderMmsComponent;
  let fixture: ComponentFixture<SenderMmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenderMmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderMmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
