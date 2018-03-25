import { FormControl } from '@angular/forms';
import { isNil, isEmpty } from 'ramda';

export const validateHtmlTextMaxLength = (max: number) => (c: FormControl) => {
  const length = c.value
    ? c.value
        .replace(/<[^>]*>/g, '')
        .replace(/&((#([0-9]{2,4}))|([a-zA-Z0-9]{2,7}))*;/g, ' ').length
    : 0;
  if (length > max) {
    return { maxlength: { requiredLength: max } };
  }
};
