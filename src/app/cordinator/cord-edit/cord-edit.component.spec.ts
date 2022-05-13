import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordEditComponent } from './cord-edit.component';

describe('CordEditComponent', () => {
  let component: CordEditComponent;
  let fixture: ComponentFixture<CordEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CordEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
