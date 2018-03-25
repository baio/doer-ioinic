import { ValidatorFn } from "@angular/forms";

export type FieldId = string;
export type PositiveNumber = number;

export interface FieldValidation {
    required?: boolean|null;
    custom?: ValidatorFn []|null;
}

export interface TextFieldValidation extends FieldValidation {
    minLength?: PositiveNumber|null;
    maxLength?: PositiveNumber|null;
}

export interface TextField {
    kind: 'TextField';
    id: FieldId;
    label?: string|null;
    placeholder?: string;
    validation?: TextFieldValidation|null;
    value?: string;
}

export type Field = TextField;
