import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffexpenseComponent } from './staffexpense.component';

describe('StaffexpenseComponent', () => {
  let component: StaffexpenseComponent;
  let fixture: ComponentFixture<StaffexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffexpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
