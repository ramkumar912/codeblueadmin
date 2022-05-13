import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCloseComponent } from './staff-close.component';

describe('StaffCloseComponent', () => {
  let component: StaffCloseComponent;
  let fixture: ComponentFixture<StaffCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffCloseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
