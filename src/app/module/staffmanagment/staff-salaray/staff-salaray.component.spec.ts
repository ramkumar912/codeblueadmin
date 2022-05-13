import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSalarayComponent } from './staff-salaray.component';

describe('StaffSalarayComponent', () => {
  let component: StaffSalarayComponent;
  let fixture: ComponentFixture<StaffSalarayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffSalarayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSalarayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
