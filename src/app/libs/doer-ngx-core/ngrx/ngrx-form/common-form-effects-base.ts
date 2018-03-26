import * as E from './effects';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
// import { ToastrService, BusyService, GoActionPayload } from '../../../index';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/Observable/merge';
import * as A from './actions';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { flatMap } from 'rxjs/operators';

import { map, propEq, any as rany, eqProps, pipe, filter, anyPass, reject, apply, tap, isNil, contains, last } from 'ramda';
import { ActionPred, DisplayErrorFn, ObservableMap } from '../ngrx.types';
import { IAction } from '../../../doer-core';
import { displayBusyEffect, DisplayBusyFn, SelectRoutePrms } from '../effect-helpers';

export type FormWrap = (fn: (payload: Observable<any>) => Observable<A.FormAction>) =>
  (actions$: Actions<Action>) => Observable<IAction<any, A.FormAction>>;

export type CommonFormEffectsMethod = (_this: CommonFormEffectsBase) => ObservableMap<IAction<any, any>, A.FormAction>;

export const loadForm: CommonFormEffectsMethod = _this => actions$ =>
  actions$.pipe(
    _this.wrap(
      E.loadFormEffect(_this.selectRoutePrms)(_this.load)(_this.store$)
    ) as any
  );

export const saveForm: CommonFormEffectsMethod = (_this: CommonFormEffectsBase) => actions$ =>
  actions$.pipe(
    _this.wrap(
      E.saveFormEffect(_this.selectRoutePrms)(_this.selectFormState)(_this.save)(_this.store$)
    ) as any
  );

export const initParamsChangeForm: CommonFormEffectsMethod = _this => actions$ =>
  actions$.pipe(
    _this.wrap(
      E.routeParamsChangedFormEffect
    ) as any
  );

export const displayFormErrors: CommonFormEffectsMethod = _this => actions$ =>
  actions$.pipe(
    _this.wrap(
      E.displayFormErrorsEffect(_this.displayErrorFn, [A.isLoadFormResultAction, A.isSaveFormResultAction])
    ) as any
  );

export const displayFormPredsErrors: CommonFormEffectsMethod = _this => actions$ =>
  actions$.pipe(
    E.displayFormErrorsEffect(
      _this.displayErrorFn, _this.busyPreds && _this.busyPreds[1] || []
    )
  );

export const displayFormBusy: CommonFormEffectsMethod = _this => actions$ =>
  actions$.pipe(
    _this.wrap(
      E.displayFormBusyEffect(_this.displayBusyFn)
    ) as any
  );

export const displayFormPredsBusy: CommonFormEffectsMethod = _this => actions$ => actions$.pipe(
  displayBusyEffect
    (_this.busyPreds ? _this.busyPreds[0] : [], _this.busyPreds ? _this.busyPreds[1] : [])
    (_this.displayBusyFn)
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
    public readonly store$: Store<any>,
    public readonly actions$: Actions,
    public readonly displayErrorFn: DisplayErrorFn,
    public readonly displayBusyFn: DisplayBusyFn,
    public readonly wrap: FormWrap,
    public readonly selectRoutePrms: SelectRoutePrms,
    public readonly selectFormState: E.SelectFormState,
    public readonly load: E.LoadFormFn,
    public readonly save: E.SaveFormFn,
    public readonly busyPreds?: [ ActionPred[], ActionPred [] ] | null
  )
  {
  }

  createCommonEffects = (except: CommonFormEffectTypes[] = []) =>
    this.actions$.pipe(createCommonEffects(this, except))
}
