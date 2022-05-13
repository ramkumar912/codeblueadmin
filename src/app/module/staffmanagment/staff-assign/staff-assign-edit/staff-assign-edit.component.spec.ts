import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAssignEditComponent } from './staff-assign-edit.component';

describe('StaffAssignEditComponent', () => {
  let component: StaffAssignEditComponent;
  let fixture: ComponentFixture<StaffAssignEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffAssignEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAssignEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
