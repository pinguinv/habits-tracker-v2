import { WeekDayType } from '../types/week-day.type';

export function getWeekDays(): WeekDayType[] {
  return [
    { day: 'Monday', abbreviation: 'Mon', checked: false },
    { day: 'Tuesday', abbreviation: 'Tue', checked: false },
    { day: 'Wednesday', abbreviation: 'Wed', checked: false },
    { day: 'Thursday', abbreviation: 'Thu', checked: false },
    { day: 'Friday', abbreviation: 'Fri', checked: false },
    { day: 'Saturday', abbreviation: 'Sat', checked: false },
    { day: 'Sunday', abbreviation: 'Sun', checked: false },
  ];
}
