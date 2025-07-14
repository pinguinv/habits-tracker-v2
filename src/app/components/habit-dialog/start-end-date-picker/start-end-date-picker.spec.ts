import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartEndDatePicker } from './start-end-date-picker';

describe('StartEndDatePicker', () => {
  let component: StartEndDatePicker;
  let fixture: ComponentFixture<StartEndDatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartEndDatePicker]
    }).compileComponents();

    fixture = TestBed.createComponent(StartEndDatePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
