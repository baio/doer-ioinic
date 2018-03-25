import * as fromEffects from './effects';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
// import { ToastrService, BusyService, GoActionPayload } from '../../../index';
import { Observable } from 'rxjs/Observable';
import * as A from './actions';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { flatMap, mergeAll, merge } from 'rxjs/operators';

import { map, propEq, any as rany, eqProps, pipe, filter, anyPass, reject, apply, tap, isNil, contains, last } from 'ramda';
import { ActionPred, DisplayErrorFn } from '../ngrx.types';
import { IAction } from '../../../doer-core';
import { displayBusyEffect, DisplayBusyFn, SelectRoutePrms } from '../ngrx-utils';

export type FormWrap = (fn: (payload: Observable<any>) => Observable<A.FormAction>) =>
  (actions$: Actions<Action>) => Observable<IAction<any, A.FormAction>>;

export type CommonFormEffectsMethod = (_this: CommonFormEffectsBase) => (actions: Actions) => Observable<Actions>;
export const loadForm: CommonFormEffectsMethod = (_this: any) => actions$ => actions$.pipe(_this.wrap(fromEffects.loadFormEffect(_this.load)(_this.store$)));
export const saveForm: CommonFormEffectsMethod = (_this: any) => actions$ => actions$.pipe(_this.wrap(fromEffects.saveFormEffect(_this.selectFormState)(_this.save)(_this.store$)));
export const initParamsChangeForm: CommonFormEffectsMethod = (_this: any) => actions$ => actions$.pipe(_this.wrap(fromEffects.routeParamsChangedFormEffect));
export const displayFormErrors: CommonFormEffectsMethod = (_this: any) => actions$ => actions$.pipe(_this.wrap(fromEffects.displayFormErrorsEffect(_this.toastrService.showError, [A.isLoadFormResultAction, A.isSaveFormResultAction])));
export const displayFormPredsErrors: CommonFormEffectsMethod = (_this: any) => actions$ => actions$.pipe(fromEffects.displayFormErrorsEffect(_this.toastrService.showError, _this.busyPreds && _this.busyPreds[1] || []));
export const displayFormBusy: CommonFormEffectsMethod = (_this: any) => actions$ => actions$.pipe(_this.wrap(fromEffects.displayFormBusyEffect(_this.busyService.toggleBusy)));
export const displayFormPredsBusy: CommonFormEffectsMethod = (_this: any) => actions$ => actions$.pipe(
  displayBusyEffect(_this.busyPreds ? _this.busyPreds[0] : [], _this.busyPreds ? _this.busyPreds[1] : [])(_this.busyService.toggleBusy)
);

export enum CommonFormEffectTypes {
  // load list using this.load property
  LoadForm,
  SaveForm,
  InitialRouteParamsChanged,
  DisplayErrors,
  DisplayBusy
}

const createCommonEffects = (_this, except: CommonFormEffectTypes[]) => (actions): Actions =>
  pipe(
    reject(([type, _]) => contains(type, except)),
    map(([_, meth]) => meth(_this)(actions)) as any,
    apply(merge)// Observable.merge
  )(
    [
      [CommonFormEffectTypes.LoadForm, loadForm],
      [CommonFormEffectTypes.SaveForm, saveForm],
      [CommonFormEffectTypes.InitialRouteParamsChanged, initParamsChangeForm],
      [CommonFormEffectTypes.DisplayErrors, displayFormErrors],
      [CommonFormEffectTypes.DisplayErrors, displayFormPredsErrors],
      [CommonFormEffectTypes.DisplayBusy, displayFormBusy],
      [CommonFormEffectTypes.DisplayBusy, displayFormPredsBusy]
    ] as any
  ) as any;


export class CommonFormEffectsBase {

  constructor(
    protected readonly store$: Store<any>,
    protected readonly actions$: Actions,
    private readonly displayErrorFn: DisplayErrorFn,
    private readonly displayBusyFn: DisplayBusyFn,
    private readonly wrap: FormWrap,
    private readonly selectRoutePrms: SelectRoutePrms,
    private readonly selectFormState: fromEffects.SelectFormState,
    protected readonly load: fromEffects.LoadFormFn,
    protected readonly save: fromEffects.SaveFormFn,
    private readonly busyPreds?: [ ActionPred[], ActionPred [] ] | null
  ) {
  }

  createCommonEffects = (except: CommonFormEffectTypes[] = []) =>
    this.actions$.pipe(createCommonEffects(this, except))
}
