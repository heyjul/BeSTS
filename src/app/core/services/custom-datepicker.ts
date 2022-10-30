import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';

@Injectable()
export class CustomDatepicker extends NativeDateAdapter {

  override getFirstDayOfWeek(): number {
    return 1;
  }

  override parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');
      const year = parseInt(str[2], 10);
      const month = parseInt(str[1], 10) - 1;
      const day = parseInt(str[0], 10);
      return new Date(year, month, day);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  override format(date: Date, displayFormat: any): string {
    return formatDate(date, 'dd/MM/yyyy', 'fr-FR');
  }
}
