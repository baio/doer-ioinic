import { FormControl } from '@angular/forms';

const VALIDATE_SELECT_EMPTY = "VALIDATE_SELECT_EMPTY";

export const validateSelectorNotEmpty = (c: FormControl) => {
    if (c.value === null) { return { validateSelectEmpty: { err : VALIDATE_SELECT_EMPTY } } }
  }
