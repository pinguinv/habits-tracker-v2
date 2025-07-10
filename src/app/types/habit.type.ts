export type HabitType = {
  id: number;
  title: string;
  shortDescription: string;
  color: string;
  frequency: string;
};

// frequency encoding:
//  every day = 'D'
//  specific days of the week = 'W1,2,3,4,5,6,7'
//    'W{dayOfTheWeek},{dayOfTheWeek}...'
//    dayOfTheWeek: 1-7
// repeat, = 'RR2' || 'RA2,1'
//  'RR{daysInterval}' || 'RA{daysDoTheHabit},{daysRest}'
//  daysInterval: > 1
//  daysDoTheHabit: > 0
//  daysRest: > 0
