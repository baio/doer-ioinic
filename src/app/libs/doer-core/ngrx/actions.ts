
import { prop } from 'ramda';
import { Result, isOK, isErr, ok } from '../result';

//

export interface IAction<T extends string, P> {
  type: T;
  payload: P;
}

export type NgrxAction = any;

export type CreateAction = <T extends string, P>(type: T) => (payload?: P) => IAction<T, P>;
export const action: CreateAction = type => payload => ({ type, payload });

// export type IsAction = <T>(type: string) => (action: Action) => action is IAction<T>;
export const isAction = <T extends string, P>(type: string) => (act: NgrxAction): act is IAction<T, P> => act.type === type;

export interface IResultAction<T extends string, P> {
  type: T;
  payload: Result<P>;
}

///

export type PayloadReducer<S, P> = (state: S, payload: P) => S;
export type PayloadResultReducer<S, P> = (state: S, payload: Result<P>) => S;

export type PayloadReducerCurried<S, P> = (state: S) => (payload: P) => S;
export type PayloadResultReducerCurried<S, P> = (state: S) => (payload: Result<P>) => S;

export type CreateResultAction = <T extends string, P>(type: T) => (payload?: Result<P>) => IResultAction<T, P>;
export const resultAction: CreateResultAction = type => payload => ({ type, payload });
export const isResultAction = <T extends string, P>(type: T) => (act: NgrxAction): act is IResultAction<T, P> => act.type === type;

export type GetPayload = <T extends string, P>(action: IAction<T , P>) => P;
export const getPayload: GetPayload = prop('payload');


