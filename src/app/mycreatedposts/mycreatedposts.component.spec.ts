import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycreatedpostsComponent } from './mycreatedposts.component';

describe('MycreatedpostsComponent', () => {
  let component: MycreatedpostsComponent;
  let fixture: ComponentFixture<MycreatedpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycreatedpostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MycreatedpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
