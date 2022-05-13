import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffLeaveAddComponent } from './staff-leave-add.component';

describe('StaffLeaveAddComponent', () => {
  let component: StaffLeaveAddComponent;
  let fixture: ComponentFixture<StaffLeaveAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffLeaveAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffLeaveAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
