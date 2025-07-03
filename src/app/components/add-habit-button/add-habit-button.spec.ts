import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddHabitButton } from './add-habit-button';

describe('AddHabitButton', () => {
  let component: AddHabitButton;
  let fixture: ComponentFixture<AddHabitButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHabitButton]
    }).compileComponents();

    fixture = TestBed.createComponent(AddHabitButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
