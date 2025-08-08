import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePeriodPickerInput } from './time-period-picker-input';

describe('TimePeriodPickerInput', () => {
  let component: TimePeriodPickerInput;
  let fixture: ComponentFixture<TimePeriodPickerInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePeriodPickerInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimePeriodPickerInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
