import { HabitType } from './habit.type';

export type HabitDialogDataType = {
  type: 'add' | 'edit';
  habitData?: HabitType;
};
