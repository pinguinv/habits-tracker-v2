import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { getWeekDays } from '../../../../shared/week-days';
import { WeekDayType } from '../../../../types/week-day.type';

@Component({
  selector: 'app-small-frequency-display',
  imports: [CommonModule],
  templateUrl: './small-frequency-display.html',
  styleUrl: './small-frequency-display.scss',
})
export class SmallFrequencyDisplay {
  readonly displayColor = input.required<string>();
  readonly encodedFrequency = input.required<string>();

  protected readonly displayedMessage = computed<string>(() => {
    const frequency = this.encodedFrequency();
    let message = '';

    switch (frequency[0]) {
      case 'D':
        message = 'Every day';
        break;
      case 'W':
        frequency
          .substring(1)
          .split(',')
          .forEach((weekDayNumStr) => {
            message +=
              this.weekDays[parseInt(weekDayNumStr)].abbreviation + ' - ';
          });

        message = message.substring(0, message.length - 3);
        break;
      case 'R':
        if (frequency[1] === 'A') {
          message = 'Alternate days: ';

          frequency
            .substring(2)
            .split(',')
            .forEach((daysCountStr) => {
              message += daysCountStr + ' x ';
            });

          message = message.substring(0, message.length - 3);
          break;
        }

        message = `Every ${frequency.substring(2)} days`;
        break;
    }

    return message;
  });

  private readonly weekDays: WeekDayType[] = getWeekDays();
}
