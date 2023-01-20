import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllreplysComponent } from './allreplys.component';

describe('AllreplysComponent', () => {
  let component: AllreplysComponent;
  let fixture: ComponentFixture<AllreplysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllreplysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllreplysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
