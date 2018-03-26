import { assoc, pipe, prop } from 'ramda';
import { mapR, chainErrorR, ok, Result } from '../../doer-core';
import { getErrorMessage } from './error-helpers';


export const reduceStatus = state => (kind, latestError) =>
  assoc('status', { kind, latestError: null }, state);

export interface Status {
  kind: string;
  latestError?: string;
}

export interface StateWithStatus {
    status: Status;
}

const defaultErrFun = getErrorMessage('Ошибка сервера', 'Неизвестная ошибка');

export type ResultWithReduceStatus = <S extends StateWithStatus, P = any>(kind: string) =>
  (okFn: (state: S) => (payload: P) =>  S, errFn?: (err: any) => string) => (state: S) => (payload: Result<P>) => S;
export const reduceResultWithStatus: ResultWithReduceStatus  = (kind) => (okFn, errFn = defaultErrFun) => state =>
  pipe(
    mapR(
      pipe(
        okFn(state),
        assoc('status', { kind, latestError: null})
      )
    ),
    chainErrorR(
      pipe(
        errFn,
        err => assoc('status', { kind, latestError: err}, state),
        ok
      )
    ),
    prop('value') as any
  ) as any;


