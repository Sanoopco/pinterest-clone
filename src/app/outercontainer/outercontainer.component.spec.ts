import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutercontainerComponent } from './outercontainer.component';

describe('OutercontainerComponent', () => {
  let component: OutercontainerComponent;
  let fixture: ComponentFixture<OutercontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutercontainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutercontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
