import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCloseEditComponent } from './staff-close-edit.component';

describe('StaffCloseEditComponent', () => {
  let component: StaffCloseEditComponent;
  let fixture: ComponentFixture<StaffCloseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffCloseEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCloseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
