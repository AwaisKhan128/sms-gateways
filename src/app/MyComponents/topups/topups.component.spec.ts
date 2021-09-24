import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupsComponent } from './topups.component';

describe('TopupsComponent', () => {
  let component: TopupsComponent;
  let fixture: ComponentFixture<TopupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
