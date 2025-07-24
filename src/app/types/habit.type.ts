export type HabitType = {
  id: number;
  title: string;
  shortDescription: string;
  color: string;
  frequency: string;
  startDate: string;
  endDate: string;
  priority: number;
};

// frequency encoding:
//  every day = 'D'
//  specific days of the week = 'W0,1,2,3,4,5,6'
//    'W{dayOfTheWeek},{dayOfTheWeek}...'
//    dayOfTheWeek: 0-6
// repeat, = 'RR2' || 'RA2,1'
//  'RR{daysInterval}' || 'RA{daysDoTheHabit},{daysRest}'
//  daysInterval: > 1
//  daysDoTheHabit: > 0
//  daysRest: > 0

// startDate & endDate:
//  YYYY-MM-DD
