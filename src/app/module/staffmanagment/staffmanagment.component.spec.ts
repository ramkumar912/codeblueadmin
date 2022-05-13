import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffmanagmentComponent } from './staffmanagment.component';

describe('StaffmanagmentComponent', () => {
  let component: StaffmanagmentComponent;
  let fixture: ComponentFixture<StaffmanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffmanagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
