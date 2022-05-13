import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffExpenseEditComponent } from './staff-expense-edit.component';

describe('StaffExpenseEditComponent', () => {
  let component: StaffExpenseEditComponent;
  let fixture: ComponentFixture<StaffExpenseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffExpenseEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffExpenseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
