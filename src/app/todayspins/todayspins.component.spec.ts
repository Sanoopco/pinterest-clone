import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayspinsComponent } from './todayspins.component';

describe('TodayspinsComponent', () => {
  let component: TodayspinsComponent;
  let fixture: ComponentFixture<TodayspinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayspinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayspinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
