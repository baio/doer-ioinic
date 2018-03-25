import { FormState, FormData } from './ngrx-form.types';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IAction, getPayload, filterMapRx, mapPropX } from '../../../doer-core';
import * as A from './actions';
import { Actions } from '@ngrx/effects';
import { filter, map, switchMap, withLatestFrom, mapTo } from 'rxjs/operators';
import { EffectFn, EffectFnPrms, DisplayErrorFn, ActionPred, ObservableMap, RoutePrms } from '../ngrx.types';
import { effectWithResultFun, displayErrorsEffect, displayBusyEffect, SelectRoutePrms, DisplayBusyFn } from '../ngrx-utils';
import { evolve, F } from 'ramda';

export { SelectRoutePrms, DisplayErrorFn, DisplayBusyFn };

export type SelectFormState = (store$: Store<any>) => Observable<FormState>;

export type SubFormActionsPredicate = (action: IAction<any, any>) => boolean;
export type SubFormActionsMap = (action: A.FormAction) => IAction<any, A.FormAction>;
export type SubFormActionsFn = (payload: Observable<any>) => Observable<A.FormAction>;
export type SubFormActionsWrap = (
  pred: SubFormActionsPredicate,
  map: SubFormActionsMap
) => (fn: SubFormActionsFn) => (actions$: Actions) => Observable<IAction<any, A.FormAction>>;

export const subFormActionsWrap: SubFormActionsWrap = (pred, m) => fn => actions$ =>
  actions$.pipe(filter(pred), map(getPayload), fn, map(m));

export type LoadFormFn<T = any> = EffectFn<T>;
export type LoadFormEffect = (selectRoutePrms: SelectRoutePrms) => (fn: LoadFormFn) => (store: Store<any>) => ObservableMap<A.FormAction, A.SaveFormResultAction>;
export const loadFormEffect: LoadFormEffect = selectRoutePrms => fn =>
    effectWithResultFun(selectRoutePrms)(A.isLoadFormAction, A.loadFormResultAction)(switchMap(fn));

export interface SaveFormData  {
  data: Partial<FormData>;
  stateData: FormData;
}
export type SaveFormFn = EffectFn<any, EffectFnPrms<SaveFormData>>;
export type SaveFormEffect = (selectRoutePrms: SelectRoutePrms) => (selectFormState: SelectFormState) => (fn: SaveFormFn) => (store$: Store<any>) => ObservableMap<A.FormAction, A.SaveFormResultAction>;
export const saveFormEffect: SaveFormEffect = selectRoutePrms => selectFormState => fn => store$ =>
  effectWithResultFun
    (selectRoutePrms)
    (A.isSaveFormAction, A.saveFormResultAction)
    ($ =>
      $.pipe(
        withLatestFrom(
          store$.select(selectFormState).pipe(mapPropX('data' as any)),
          (prms, stateData) => evolve({ data: data => ({ data,  stateData}) }, prms)
        ),
        switchMap(fn)
      )
    )
    (store$);

export const routeParamsChangedFormEffect: ObservableMap<A.FormAction, A.LoadFormAction> = actions$ =>
actions$.pipe(
  // filter and getPayload in as single operator
  filterMapRx(A.isFormRouteParamChangedAction)(getPayload),
  mapTo(A.loadFormAction(null)),
);

export type DisplayFormErrorEffect = (
  fn: DisplayErrorFn,
  preds: ActionPred[],
  messagePrefix?: string | null
) => ObservableMap<A.FormAction, any>;
export const displayFormErrorsEffect: DisplayFormErrorEffect = (fn, preds, messagePrefix) => actions$ =>
  preds.length ? displayErrorsEffect(preds, fn, messagePrefix)(actions$) : actions$.pipe(filter(F));

export const displayFormBusyEffect =
  displayBusyEffect([A.isLoadFormAction, A.isSaveFormAction], [A.isLoadFormResultAction, A.isSaveFormResultAction]);

