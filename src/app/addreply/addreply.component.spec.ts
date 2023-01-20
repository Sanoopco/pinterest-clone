import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreplyComponent } from './addreply.component';

describe('AddreplyComponent', () => {
  let component: AddreplyComponent;
  let fixture: ComponentFixture<AddreplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddreplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddreplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
