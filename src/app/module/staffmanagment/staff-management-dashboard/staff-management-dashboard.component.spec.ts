import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffManagementDashboardComponent } from './staff-management-dashboard.component';

describe('StaffManagementDashboardComponent', () => {
  let component: StaffManagementDashboardComponent;
  let fixture: ComponentFixture<StaffManagementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffManagementDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
