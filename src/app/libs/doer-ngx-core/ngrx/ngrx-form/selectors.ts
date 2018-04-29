import { Observable } from "rxjs/Observable";
import { FormState, FormStateStatusKind, FormStateStatus } from "./ngrx-form.types";
import { prop$ } from "../../../doer-core";
import { distinctUntilChanged, filter } from "rxjs/operators";
import { compose, isNil, prop, propOr, propEq } from "ramda";

export type FormSelectData = ($: Observable<FormState>) => Observable<any>;
export const formSelectedData: FormSelectData = $ => $.pipe(
    prop$('data'),
    distinctUntilChanged()
  );

export type FormSelectSuccessStatus = ($: Observable<FormState>) => Observable<FormStateStatus>;
export const formSelectSuccessStatus: FormSelectSuccessStatus = $ => $.pipe(
    prop$('status'),
    filter(
        compose(isNil, propOr(null, 'latestError'))
    ),
    distinctUntilChanged()
);

export type FormSelectSuccessStatusKind = (kind: FormStateStatusKind) => ($: Observable<FormState>) => Observable<FormStateStatus>;
export const formSelectSuccessStatusKind: FormSelectSuccessStatusKind = kind => $ => $.pipe(
    formSelectSuccessStatus,
    filter(propEq('kind', kind)),
    distinctUntilChanged()
);
