export type HabitType = {
  id: number;
  title: string;
  shortDescription: string;
  color: string;
  frequency: string;
  startDate: string;
  endDate: string;
  priority: number;

  evalMethod: string;
};

// Frequency encoding:
//  Every day = 'D'
//  Specific days of the week = 'W0,1,2,3,4,5,6'
//      'W{dayOfTheWeek},{dayOfTheWeek}...'
//    dayOfTheWeek: 0-6
//  Repeat = 'RR2' || 'RA2,1'
//      'RR{daysInterval}' || 'RA{daysDoTheHabit},{daysRest}'
//    daysInterval: > 1
//    daysDoTheHabit: > 0
//    daysRest: > 0

// startDate & endDate:
//    YYYY-MM-DD

// Evaluation method encoding:
//  Boolean (yes/no) = 'B'
//  Numeric value = 'N'
//      'N{specifier},{units},{value}'
//    specifier:
//      - any value = 'A'
//      - less than = 'L'
//      - at least =  'M'
//      - exactly = 'E'
//    units: string - user input (optional)
//    value: floating point number (if specifier is not 'A')
//  Timer = 'T'
//      'T{specifier},{value}'
//    specifier:
//      - any value = 'A'
//      - less than = 'L'
//      - at least =  'M'
//    value: 'hh:mm:ss' (if specifier is not 'A')
