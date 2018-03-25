/*
import { FormControl } from '@angular/forms';
import { IDate, ITime } from '../types/date-time.types';

const VALIDATE_TIME_FORMAT = 'VALIDATE_TIME_FORMAT';
const VALIDATE_DATE_NEGATIVE_YEAR = 'VALIDATE_DATE_NEGATIVE_YEAR';

export const validateTime = (c: FormControl) => {
    const val: ITime = c.value;

    if (val && val.minute && val.minute > 59) {
       return { validateTime: { err : VALIDATE_TIME_FORMAT } }
    }

  };

export const validateDate = (c: FormControl) => {
  const date: IDate = c.value;
  if (date && date.year && date.year <= 0) {
    return { validateDate: { err: VALIDATE_DATE_NEGATIVE_YEAR } }
  }
};
*/