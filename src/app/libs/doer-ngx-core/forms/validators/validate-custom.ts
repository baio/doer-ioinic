
import { FormControl } from '@angular/forms';
import { isNil, isEmpty, has } from 'ramda';

const VALIDATE_CUSTOM = "VALIDATE_CUSTOM";

export const validateCustom = (text: string) => (c: FormControl) => {
    if (!isNil(text)) { return { validateCustom: { err : VALIDATE_CUSTOM,  text } } }
}
