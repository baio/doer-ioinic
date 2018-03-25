import { FormControl, Validators } from '@angular/forms';
import { isNil, isEmpty } from 'ramda';

export const requiredTrim = (c: FormControl) => 
  !c.value || typeof c.value === 'string' && !c.value.trim() ? { required: true } : null

