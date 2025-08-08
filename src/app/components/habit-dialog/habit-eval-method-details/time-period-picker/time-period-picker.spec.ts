import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePeriodPicker } from './time-period-picker';

describe('TimePeriodPicker', () => {
  let component: TimePeriodPicker;
  let fixture: ComponentFixture<TimePeriodPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePeriodPicker]
    }).compileComponents();

    fixture = TestBed.createComponent(TimePeriodPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
