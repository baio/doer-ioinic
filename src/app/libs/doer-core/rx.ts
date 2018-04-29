import { Observable } from 'rxjs/Observable';
import { Result, isOK, mapR as _mapR, lift2R, lift3R, ok, err } from './result';
import { map, filter, flatMap, catchError } from 'rxjs/operators';
import { Fun } from './_';
import { prop } from 'ramda';
import { of } from 'rxjs/Observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
/**
 * All these functions mostly transformation of Result operators to Observable<Result> operators
 */

/**
 * xfunction mapR$
 * Map stream of observable `Result`s.
 * If value in the stream has `OK` type, mapping will be done; if not `Error` will be emitted as is.
 * See also `mapR`
 * @argument function `fn` which maps one value to another
 * @argument obs Stream of observable Results
 * xreturns source stream of observable Result T
 * @example
 * ```
 * const a$ = Observable.of(ok(2));
 * a$.pipe(mapR$(x => x + 10)).subscribe(console.log)
 * // OK(12)
 * const b$ = Observable.of(err('error here'));
 * const res = b$.pipe(
 *  mapR$(x => x + 2),
 *  mapR$(x => x * 3),
 * ).subscribe(console.log);
 * // Error('error here')
 * ```
 */
export type MapRx = <T1, T2>(f: (x: T1) => T2) => (obs: Observable<Result<T1>>) => Observable<Result<T2>>;
// @obsolete name use mapR$ instead
export const mapRx: MapRx = f => obs => obs.pipe(map(_mapR(f)));

export type FlatMapR$ = <T1, T2>(f: (x: T1) => Observable<Result<T2>>) => (obs: Observable<Result<T1>>) => Observable<Result<T2>>;
export const flatMapR$: FlatMapR$ = f => obs => obs.pipe(
    flatMap((x: Result<any>) =>
      isOK(x) ? f(x.value) : of(x)
    )
  );


export type OfPromiseR$ = <T1>(p: Promise<T1>) => Observable<Result<T1>>;
export const ofPromiseR$: OfPromiseR$ = p => fromPromise(p).pipe(map(ok), catchError(e => of(err(e))));

/**
 * xfunction propR$
 * Given property name and `Stream` of `Result`s will extract value of the property `p` from 'Result` value if it is `ok`.
 * If value in the stream has `OK` type, mapping will be done; if not `Error` will be emitted as is.
 * See also `propR`
 * @argument string (keyof T) - property name of the type T1
 * @argument obs source stream of the observable Results
 * xreturns Observable Result T
 * @example
 * ```
 * const a$ = Observable.of(ok({a: 1, b: 2}));
 * a$.pipe(
 *  propR$('b'),
 *  mapR$(x => x * 3),
 * ).subscribe(console.log);
 * // OK(6)
 * ```
 */
export type MapPropRx = <T, K extends keyof T>(p: K) => (obs: Observable<Result<T>>) => Observable<Result<T[K]>>;
// @obsolete name, use propR$
export const mapPropRx: MapPropRx = p => mapRx(prop(p) as any);

/**
 * xfunction filterMap$
 * Convenience
 * Given stream, first filter it by predicate and then map by mapping function
 * @argument f function (T1 => boolean) predicate to filter stream
 * @argument mp function (T1 => T2) mapping function to map values in the stream
 * @argument obs Observable<T1> source stream of the values
 * xreturns Observable T2
 * @example
 * ```
 * const a$ = Observable.from([3, 5]);
 * a$.pipe(
 *  filterMap$(x => x > 3)(x => x + 2),
 * ).subscribe(console.log);
 * // 7
 * ```
 */
export type FilterMapRx = <T1, T2>(fr: Fun<T1, boolean>) => (mp: Fun<T1, T2>) => (obs: Observable<T1>) => Observable<T2>;
// @obsolete use filterMap$
export const filterMapRx = fr => mp => obs =>
    obs.pipe(filter(fr), map(mp));

export type Prop$ = <T, K extends keyof T>(p: K) => (obs: Observable<T>) => Observable<T[K]>;
// @obsolete name, use propR$
export const prop$: Prop$ = p => map(prop(p) as any);

/*
  Not sure if used somewhere
  export type ChoiseRx = <T1>(obs: Observable<Result<T1>>) => Observable<T1>;
  export const choiseRx: ChoiseRx = filterMapRx(isOK)(prop('value'));

  export type ChoiseMapRx = <T1, T2> (mp: Func<T1, T2>) => (obs: Observable<Result<T1>>) => Observable<T2>;
  export const choiseMapRx: ChoiseMapRx = mp => obs => obs.pipe(choiseRx, map(mp));
*/

// new naming conventions
export const mapR$ = mapRx;
export const propR$ = mapPropRx;
export const filterMap$ = filterMapRx;
/*
  Not sure if used somewhere
  export const choiseR$ = choiseRx;
  export const choiseMapR$ = choiseMapRx;
*/


/**
 * xfunction lift2R$
 * Given function with 2 arguments (curried) and stream of two elements arrays of the sum-type `Result`, will invoke given function
 * only if both elements have `OK` type, result of the function will be emitted as `OK` type to the stream.
 * If any of the arguments has `Error` type this result will be emitted as first encountered `Error`.
 * There is different signature from canonic `lift` operator, because mostly this function is used after `forkJoin` which emits result as array
 * @argument f `S => S1 => S2` 2 arguments function
 * @argument $ - Observable<[a: Result<S>, b: Result<S1>]> source stream of the observable values (which is array with 2 Result elements)
 * xreturns Observable<S2> stream with result `OK` if both a and b is `OK` and `Error` if any of them is `Error`
 * @example
 * ```
 * const mapping = a => b => a + b;
 * Observable.forkJoin(
 *   http.getRes1(), // suppose emits OK(2)
 *   http.getRes2() // suppose emits OK(3)
 * )(lift2R$(mapping)).subscribe(console.log)
 * // 5
 * ```
 */
export const lift2R$ = <S, S1, S2>(f: (x: S) => (y: S1) => S2) => ($: Observable<[Result<S>, Result<S1>]>): Observable<Result<S2>> =>
  $.pipe(map(([a, b]) => lift2R(f)(a)(b) as any));

/**
 * xfunction lift3R$
 * Given function with 3 arguments (curried) and stream of 3 elements arrays of the sum-type `Result`, will invoke given function
 * only if all elements have `OK` type, result of the function will be emitted as `OK` type to the stream.
 * If any of the arguments has `Error` type this result will be emitted as first encountered `Error`.
 * There is different signature from canonic `lift` operator, because mostly this function is used after `forkJoin` which emits result as array
 * @argument f `S => S1 => S2 => S3` 3 arguments function
 * @argument $ - Observable<[a: Result<S>, b: Result<S1>, c: Result<S1>]> source stream of the observable values (which is array with 3 Result elements)
 * xreturns Observable<S3> stream with result `OK` if all a, b and c is `OK` and `Error` if any of them is `Error`
 * @example
 * ```
 * const mapping = a => b => c => a + b + c;
 * Observable.forkJoin(
 *   http.getRes1(), // suppose emits OK(2)
 *   http.getRes2() // suppose emits OK(3)
 *   http.getRes3() // suppose emits OK(4)
 * )(lift3R$(mapping)).subscribe(console.log)
 * // 9
 * ```
 */
export const lift3R$ = <S, S1, S2, S3>(f: (x: S) => (y: S1) => (z: S2) => S3) => ($: Observable<[Result<S>, Result<S1>, Result<S2>]>): Observable<Result<S3>> =>
  $.pipe(map(([a, b, c]) => lift3R(f)(a)(b)(c) as any));
