import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { catchError } from 'rxjs';

import { HabitType } from '../types/habit.type';
import { getMockDataWithSomeDelay } from './mock-data.service';

type HabitsStoreState = {
  habits: HabitType[];
  isLoadedData: boolean;
};

const initialState: HabitsStoreState = {
  habits: [],
  isLoadedData: false,
};

export const HabitsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    return {
      addHabit(newHabit: HabitType): void {
        newHabit.id = store.habits().length;
        patchState(store, { habits: [...store.habits(), newHabit] });
      },
      updateHabit(updatedHabit: HabitType): void {
        patchState(store, {
          habits: store.habits().map((habit) => {
            if (habit.id === updatedHabit.id) {
              return updatedHabit;
            }
            return habit;
          }),
        });
      },
      fetchData(): void {
        const sub = getMockDataWithSomeDelay()
          .pipe(
            catchError((err) => {
              console.error(err);
              return [];
            })
          )
          .subscribe((data: HabitType[]) => {
            patchState(store, { habits: data, isLoadedData: true });

            sub.unsubscribe();
          });
      },
    };
  })
);
