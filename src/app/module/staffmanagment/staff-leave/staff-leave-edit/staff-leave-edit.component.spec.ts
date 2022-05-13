import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLeaveEditComponent } from './staff-leave-edit.component';

describe('StaffLeaveEditComponent', () => {
  let component: StaffLeaveEditComponent;
  let fixture: ComponentFixture<StaffLeaveEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffLeaveEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffLeaveEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
