import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedpostdetailComponent } from './savedpostdetail.component';

describe('SavedpostdetailComponent', () => {
  let component: SavedpostdetailComponent;
  let fixture: ComponentFixture<SavedpostdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedpostdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedpostdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
