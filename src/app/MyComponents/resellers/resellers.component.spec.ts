import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellersComponent } from './resellers.component';

describe('ResellersComponent', () => {
  let component: ResellersComponent;
  let fixture: ComponentFixture<ResellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResellersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
