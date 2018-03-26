import { Observable } from 'rxjs/Observable';
import { ActionPred, ActionResultFactory, ObservableMap, DisplayErrorFn, RoutePrms } from './ngrx.types';
import { Store } from '@ngrx/store';
import { IAction, IResultAction, filterMapRx, getPayload, isErr, mapPropX, guid } from '../../doer-core';
import { withLatestFrom, map, filter, tap, merge, mergeAll } from 'rxjs/operators';
import { selectRouterIdPath, selectRouterSegments } from './ngrx-router/selectors';
import { anyPass, F, cond } from 'ramda';
import { getErrorMessage } from './error-helpers';

export type SelectRoutePrms = (store$: Store<any>) => Observable<RoutePrms>;
export type EffectWithResultFun = (selectRoutePrms: SelectRoutePrms) =>
  (pred: ActionPred, crt: ActionResultFactory) => (fn: any) =>
    (store$: Store<any>) => (listActions: Observable<IAction<any, any>>) => Observable<IResultAction<any, any>>;
export const effectWithResultFun: EffectWithResultFun = selectRoutePrms => (pred, crt) => fn => store$ => actions$ => {
  return actions$.pipe(
    filterMapRx(pred)(getPayload),
    withLatestFrom(
      selectRoutePrms(store$),
      (data, routePrms) => ({data, ...routePrms})
    ),
    fn,
    map(crt)
  );
}

// Display Errors


export interface HandleErrorOpts {
    preds: ActionPred[];
    httpErrorMessage: string;
    unknownErrorMessage?: string;
    fDisplay: DisplayErrorFn;
  }

export const handleError = (opts: HandleErrorOpts) => (obs: Observable<any>) =>
  obs.pipe(
    filterMapRx(anyPass(opts.preds))(getPayload),
    filter(isErr),
    mapPropX('error'),
    map(getErrorMessage(opts.httpErrorMessage, opts.unknownErrorMessage || opts.httpErrorMessage)),
    tap(opts.fDisplay),
    filter(F)
  );


export type DisplayErrorEffect = (preds: ActionPred[], fn: DisplayErrorFn, messagePrefix?: string | null) => ObservableMap<any, any>;
export const displayErrorsEffect: DisplayErrorEffect = (preds, fn, messagePrefix) => $ =>
    $.pipe(
        handleError({
            preds,
            httpErrorMessage: messagePrefix,
            unknownErrorMessage: messagePrefix,
            fDisplay: fn
        })
    );

// Display busy

export type DisplayBusyFn = (id: string) => (isDisplay: boolean) => void;

type BusyEffect = (preds: ActionPred[], fn) => ObservableMap<any, any>;
const busyEffect: BusyEffect = (preds, fn) => $ =>
    $.pipe(
        filter(anyPass(preds) as any),
        tap(fn)
    );

export type DisplayBusyEffect = (predsSetBusy: ActionPred[], predsResetBusy: ActionPred[]) => (fn: DisplayBusyFn) => ObservableMap<any, any>;
export const displayBusyEffect: DisplayBusyEffect = (predsSetBusy, predsResetBusy) => fn => {
  const xfn = fn(guid());
  return $ =>
    $.pipe(
        merge(
            busyEffect(predsSetBusy, () => xfn(true)),
            busyEffect(predsResetBusy, () => xfn(false))
        ),
        filter(F)
    );
  };

