import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlAccessoryComponent } from './form-control-accessory.component';

describe('FormControlAccessoryComponent', () => {
  let component: FormControlAccessoryComponent;
  let fixture: ComponentFixture<FormControlAccessoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormControlAccessoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlAccessoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
