import { always, pipe, prop, reduce, when } from 'ramda';

export interface OK<T> {
    kind: 'OK';
    value: T;
}

export interface Err {
    kind: 'Err';
    error: any;
}

export type Result<T> = OK<T> | Err;
export const isOK = <T>(r: Result<T>): r is OK<T> => r.kind === 'OK';
export const isErr = <T>(r: Result<T>): r is Err => r.kind === 'Err';
export const ok = <T>(value: T): OK<T> => ({kind: 'OK', value});
export const err = (error: any): Err => ({kind: 'Err', error});

//

export const mapR = <T1, T2>(fn: (x: T1) => T2) => (y: Result<T1>): Result<T2> =>
  isOK(y) ? ok(fn(y.value)) : y;

export const mapErrorR = <T1, T2>(fn: (x: T1) => T2) => (y: Result<T1>): Result<T1> =>
  isErr(y) ? err(fn(y.error)) : y;


export const chainR = <T1, T2>(fn: (x: T1) => Result<T2>) => (y: Result<T1>): Result<T2> => isOK(y) ? fn(y.value) : y;

export const chainErrorR = <T>(fn: (x: any) => Result<T>) => (y: Result<T>): Result<T> =>
  isErr(y) ? fn(y.error) : y;

export type MapPropR = <T>(p: string, f: ((x: any) => T)) => (r: Result<any>) => Result<T>;
export const mapPropR: MapPropR = (p, f) => mapR(pipe(prop(p), f));

export const sequenceR = <T>(list: Array<Result<T>>): Result<T[]> =>
  reduce(
    (acc: Result<any[]>, x) => {
      if (isOK(acc) && isOK(x)) {
        return ok([...acc.value, x.value]);
      } else if (isErr(acc)) {
        return acc;
      } else if (isErr(x)) {
        return x;
      }
    },
    ok([]),
    list
  );
