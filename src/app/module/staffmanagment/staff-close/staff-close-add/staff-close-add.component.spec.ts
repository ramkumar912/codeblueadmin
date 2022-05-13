import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCloseAddComponent } from './staff-close-add.component';

describe('StaffCloseAddComponent', () => {
  let component: StaffCloseAddComponent;
  let fixture: ComponentFixture<StaffCloseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffCloseAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffCloseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
