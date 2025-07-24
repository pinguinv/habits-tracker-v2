import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { catchError } from 'rxjs';

import moment from 'moment';

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
    function checkIfIsTodaysHabit(habit: HabitType): boolean {
      const today = moment();

      if (today.isBefore(moment(habit.startDate))) return false;

      if (habit.endDate !== '')
        if (!today.isSameOrBefore(moment(habit.endDate))) return false;

      let isValid = false;

      // First char
      switch (habit.frequency[0]) {
        case 'D':
          isValid = true;
          break;

        case 'W':
          for (const weekDayNum of habit.frequency.substring(1).split(','))
            if (today.get('weekday') === parseInt(weekDayNum)) isValid = true;

          break;

        case 'R':
          // eslint-disable-next-line no-case-declarations
          const daysDifference = today.diff(moment(habit.startDate), 'days');

          // Alternate days
          if (habit.frequency[1] === 'A') {
            const daysActive = parseInt(
              habit.frequency.substring(2).split(',')[0]
            );
            const daysRest = parseInt(
              habit.frequency.substring(2).split(',')[1]
            );

            const oneCycle = daysActive + daysRest;

            // If diff % cycle is smaller than daysActive,
            // it means that today is one of the active days
            // - because each cycle begins with active days.
            if (daysDifference % oneCycle < daysActive) isValid = true;

            break;
          }

          // Standard repeat
          if (daysDifference % parseInt(habit.frequency.substring(2)) === 0)
            isValid = true;

          break;
      }

      return isValid;
    }

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
      getTodaysHabits(): HabitType[] {
        const todaysHabits = store
          .habits()
          .filter((habit) => checkIfIsTodaysHabit(habit))
          .sort((a, b) => b.priority - a.priority);

        return todaysHabits;
      },
    };
  })
);
