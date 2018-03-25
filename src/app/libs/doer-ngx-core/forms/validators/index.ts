export * from './validate-number';
export * from './validate-text';
export * from './validate-selector';
// export * from './validate-time';
export * from './validate-custom';
export * from './validate-required-trim';

export const MAX_LENGTH = 2E3;
export const SHORT_LENGTH = 25;
export const MID_LENGTH = 200;
export const LONG_LENGTH = 2E3;

export const MAX_NUMBER = 1E6;

import { Validators, ValidatorFn, FormControl } from '@angular/forms';
import { validateNumberMax } from './validate-number';
import { validateHtmlTextMaxLength } from './validate-text';

export const maxLength = Validators.maxLength(MAX_LENGTH);
export const shortLength = Validators.maxLength(SHORT_LENGTH);
export const midLength = Validators.maxLength(MID_LENGTH);
export const longLength = Validators.maxLength(LONG_LENGTH);

export const maxHtmlTextLength = validateHtmlTextMaxLength(MAX_LENGTH);
export const shortHtmlTextLength = validateHtmlTextMaxLength(SHORT_LENGTH);
export const midHtmlTextLength = validateHtmlTextMaxLength(MID_LENGTH);
export const longHtmlTextLength = validateHtmlTextMaxLength(LONG_LENGTH);

export const maxNumber = validateNumberMax(MAX_NUMBER);
