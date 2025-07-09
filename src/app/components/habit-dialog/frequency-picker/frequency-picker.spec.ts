import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrequencyPicker } from './frequency-picker';

describe('FrequencyPicker', () => {
  let component: FrequencyPicker;
  let fixture: ComponentFixture<FrequencyPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrequencyPicker]
    }).compileComponents();

    fixture = TestBed.createComponent(FrequencyPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
