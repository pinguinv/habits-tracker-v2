import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitToday } from './habit-today';

describe('HabitToday', () => {
  let component: HabitToday;
  let fixture: ComponentFixture<HabitToday>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitToday]
    }).compileComponents();

    fixture = TestBed.createComponent(HabitToday);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
