import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordViewComponent } from './cord-view.component';

describe('CordViewComponent', () => {
  let component: CordViewComponent;
  let fixture: ComponentFixture<CordViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CordViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
