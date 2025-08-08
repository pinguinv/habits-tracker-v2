import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitEvalMethodDetails } from './habit-eval-method-details';

describe('HabitEvalMethodDetails', () => {
  let component: HabitEvalMethodDetails;
  let fixture: ComponentFixture<HabitEvalMethodDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitEvalMethodDetails]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitEvalMethodDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
