import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { pipe, map, fromPairs } from 'ramda';
import { Field, TextField } from './form.types';
import { assertUnreachable, notNil } from "../../doer-core";


const nn = notNil;

export type UpdateFormvalues = (form: FormGroup) => (values: {[key: string]: any} | null) => void;
/**
 * Path form value if any or reset if null
 * @param form
 */
export const updateFormValues: UpdateFormvalues = form => vals => {
  vals ? form.patchValue(vals, { emitEvent: false }) : form.reset(undefined, {emitEvent: false});
};

const createTextInput = (field: TextField) => {
    const vn = field.validation || {};
    const vrs = [
      ...(vn.custom || []),
      ...(vn.required ? [Validators.required] : []),
      ...(nn(vn.minLength) ? [Validators.minLength(vn.minLength)] : []),
      ...(nn(vn.maxLength) ? [Validators.maxLength(vn.maxLength)] : [Validators.maxLength])
    ];
    return [nn(field.value) ? field.value : '', vrs];
  };

export type CreateForm = (fb: FormBuilder) => (inputs: Field[]) => FormGroup;
export const createForm: CreateForm = fb =>
  pipe(
    map(
      x => {
        switch (x.kind) {
          case 'TextField':
            return [x.id, createTextInput(x)];
          default:
            assertUnreachable(x.kind);
        }
      }),
    fromPairs,
    x => fb.group(x)
  );




