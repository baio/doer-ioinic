import { Result, mapR } from './result';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import { Fun } from './_';
import { compose, prop } from 'ramda';

// Just observables
export type MapPropX = <T, P extends keyof T>(p: P) => ($: Observable<T>) => Observable<T[P]>;
export const mapPropX: MapPropX = p => $ => $.pipe(map(prop(p) as any));

export type FilterMapX = <T1, T2>(fr: Fun<T1, boolean>) => (mp: Fun<T1, T2>) => (obs: Observable<T1>) => Observable<T2>;
export const filterMapRx = fr => mp => obs =>
    obs.pipe(filter(fr), map(mp));

// observables with result
export type ObservableResult<T> = Observable<Result<T>>;

export type MapRX = <T, T2>(x: Fun<T, T2>) => ($: ObservableResult<T>) => ObservableResult<T2>;
export const mapRX: MapRX = fn => $ => $.pipe(compose(fn, mapR as any) as any);