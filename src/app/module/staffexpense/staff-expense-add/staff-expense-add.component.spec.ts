import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffExpenseAddComponent } from './staff-expense-add.component';

describe('StaffExpenseAddComponent', () => {
  let component: StaffExpenseAddComponent;
  let fixture: ComponentFixture<StaffExpenseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffExpenseAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffExpenseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
