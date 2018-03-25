import { Result, mapR } from './result';
import { Observable } from 'rxjs/Observable';
import { Fun } from './_';
import { compose } from 'ramda';

export type ObservableResult<T> = Observable<Result<T>>;

export type MapRX = <T, T2>(x: Fun<T, T2>) => ($: ObservableResult<T>) => ObservableResult<T2>;
export const mapRX: MapRX = fn => $ => $.pipe(compose(fn, mapR as any) as any);