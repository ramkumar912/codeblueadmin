import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordAddComponent } from './cord-add.component';

describe('CordAddComponent', () => {
  let component: CordAddComponent;
  let fixture: ComponentFixture<CordAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CordAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CordAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
