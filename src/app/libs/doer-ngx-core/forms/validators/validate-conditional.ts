import { FormControl, ValidatorFn, Validators } from '@angular/forms';
//import { SelectComponent } from '../select';

export const validateConditional = (validator: ValidatorFn, isValidate : (c: FormControl) => boolean) => {
  (c: FormControl) => {
      if (isValidate(c)) {
          return validator(c);
      }
  }
}
