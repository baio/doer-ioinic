import { FormControl } from '@angular/forms';
import { isNil, isEmpty, has } from 'ramda';

const VALIDATE_NUMBER_NAN = "VALIDATE_NUMBER_NAN";
const VALIDATE_NUMBER_MIN = "VALIDATE_NUMBER_MIN";
const VALIDATE_NUMBER_MAX = "VALIDATE_NUMBER_MAX";
const VALIDATE_RANGE = "VALIDATE_RANGE";


interface ITime {
  hour
  minute
}

const isTime = (val: any) : val is ITime  =>
  val && has("hour", val) && has("minute", val)


export const validateNumber = (c: FormControl) => {
    if (c.value && isNaN(+c.value)) { return { validateNumber: { err : VALIDATE_NUMBER_NAN } } }
  }

export const validateNumberMin = (min: number) =>
  (c: FormControl) => {
    const val = isTime(c.value) ? c.value.hour : c.value;
    if (!isNil(val) && !isEmpty(val) && +val < min) {
      return { validateNumberMin: { err : VALIDATE_NUMBER_MIN, val : +val, limit: min } }
    }
  }

export const validateNumberMax = (max: number) =>
  (c: FormControl) => {
    const val = isTime(c.value) ? c.value.hour : c.value;

    if (!isNil(val) && !isEmpty(val) && +val > max) { return { validateNumberMax: { err : VALIDATE_NUMBER_MAX, val : +val, limit: max } } }
  }

export const getValidateRangeError = (isLowerBound: boolean, otherFieldLabel: string) =>
    ({ validateRange: { err : VALIDATE_RANGE, isLowerBound, otherFieldLabel  } })

