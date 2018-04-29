import { pipe, prop, reduce } from 'ramda';

/**
 * Result type
 * https://www.schoolofhaskell.com/school/to-infinity-and-beyond/pick-of-the-week/sum-types
 * https://fsharpforfunandprofit.com/posts/recipe-part2/
 * https://vimeo.com/97344498
 */

/**
 * Ok type
 * Success representation of Result, contains actual result in value field
 *
 * @export
 * xinterface OK
 * xteamplate T
 */
export interface OK<T> {
  kind: 'OK';
  value: T;
}

/**
 * Err type
 * Error representation of Result, contains error in err field
 *
 * @export
 * xinterface Err
 */
export interface Err {
  kind: 'Err';
  /**
   * Error could have any type.
   *
   * xtype {({ kind?: string; message?: string } & any)}
   * @memberof Err
   */
  error: { kind?: string; message?: string } & any;
}

/**
 * Sum type either OK or Err
 *
 * @export
 * xtype Result
 * xteamplate T
 */
export type Result<T> = OK<T> | Err;

/**
 * Since type script doesn't support normal pattern matching and type constructors, defined constructors and matching
 * utilities explicitly
 */

/**
 * Constructor for OK type
 */
export const ok = <T>(value: T): OK<T> => ({ kind: 'OK', value });

/**
 * Constructor for Err type
 */
export const err = (error: any): Err => ({ kind: 'Err', error });

/**
 * 'Pattern matching' utility for OK type
 * @example
 * ```
 * const add2 = (x: Result<int>): Result<int> => {
 *  if (isOk(x)) {
 *     // typescript will infer x has OK type here and will do type checking
 *     return ok(x.value + 2);
 * } else {
 *     // if error return as is
 *     return x;
 * }
 * ```
 * xparam r Result
 * xreturns OK type
 */
export const isOK = <T>(r: Result<T>): r is OK<T> => r.kind === 'OK';
/**
 * 'Pattern matching' utility for OK type
 * @example
 * ```
 * const add2 = (x: Result<int>): Result<int> => {
 *  if (isOk(x)) {
 *     // typescript will infer x has OK type here and will do type checking
 *     return ok(x.value + 2);
 * } else {
 *     // typescript will infer x has Error type here and will do type checking
 *     console.log(x.error);
 *     // if error return as is
 *     return x;
 * }
 * ```
 * xparam r Result
 * xreturns OK type
 */
export const isErr = <T>(r: Result<T>): r is Err => r.kind === 'Err';

/**
 * Common operators for Result type
 * https://fsharpforfunandprofit.com/posts/elevated-world
 */

/**
 * xfunction mapR
 * Given function `fn` which maps one value to another and argument `y`, will check if argument `y` has `OK` type and then
 * invoke function `fn` on value of the argument, after this will again return `OK` result with new mapped value.
 * If argument `y` have Error type then mapping function fn won't be invoked and error will be returned as is.
 * This allows chaining map operations on `Result` sum-type
 * @argument function `fn` which maps one value to another
 * @argument y Result T argument to map
 * xreturns Result T
 * @example
 * ```
 * const a = ok(2);
 * const res = pipe(
 *  mapR(x => x + 2),
 *  mapR(x => x * 3),
 * )(a);
 * // result OK(12)
 * const b = err('error here');
 * const res = pipe(
 *  mapR(x => x + 2),
 *  mapR(x => x * 3),
 * )(b);
 * // result Error('error here')
 * ```
 */
export const mapR = <T1, T2>(fn: (x: T1) => T2) => (y: Result<T1>): Result<T2> =>
  isOK(y) ? ok(fn(y.value)) : y;

/**
 * xfunction mapErrorR
 * Given function `fn` which maps one value to another and argument `y`, will check if argument `y` has `Error` type and then
 * invoke function `fn` on error of the argument, after this will again return `Error` result with new mapped value.
 * If argument `y` have OK type then mapping function fn won't be invoked and result will be returned as is.
 * This allows chaining map operations on `Result` sum-type
 * @argument fn function which maps one value to another
 * @argument y Result T argument to map
 * xreturns Result T
 * @example
 * ```
 * const a = ok(2);
 * const res = pipe(
 *  mapErrorR(x => x + '!'),
 *  mapR(x => x * 3),
 * )(a);
 * // result OK(6)
 * const b = err('error here');
 * const res = pipe(
 *  mapErrorR(x => x + '!'),
 *  mapR(x => x * 3),
 * )(b);
 * // result Error('error here!')
 * ```
 */
export const mapErrorR = <T1, T2>(fn: (x: T1) => T2) => (y: Result<T1>): Result<T1> =>
  isErr(y) ? err(fn(y.error)) : y;

/**
 * xfunction chainR
 * https://fsharpforfunandprofit.com/posts/elevated-world-2/#bind
 * Given function `fn` which maps value to another `Result` and argument `y` of sum-type `Result`,
 * will check if argument `y` has `OK` type and then invoke function `fn` with value of the argument `y`,
 * after this will return result returned by function `fn`.
 * If argument `y` have `Error` type then mapping function fn won't be invoked and error will be returned as is.
 * This allows chaining map operations on `Result` sum-type
 * @argument fn function `T1 => Result<T2>` which maps value to another Result
 * @argument y Result<T1> argument to map
 * xreturns Result T
 * @example
 * ```
 * const a = ok(2);
 * const res = pipe(
 *  chainR(x => ok(x + 2)),
 *  mapR(x => x * 3),
 * )(a);
 * // result OK(12)
 * const b = ok(2);
 * const res = pipe(
 *  chainR(x => err('some error')),
 *  mapR(x => x * 3),
 * )(b);
 * // result Error('some error')
 * ```
 */
export const chainR = <T1, T2>(fn: (x: T1) => Result<T2>) => (y: Result<T1>): Result<T2> => isOK(y) ? fn(y.value) : y;

/**
 * xfunction chainErrorR
 * Given function `fn` which maps value to another `Result` and argument `y` of sum-type `Result`,
 * will check if argument `y` has `Error` type and then invoke function `fn` with error from the argument `y`,
 * after this will return result returned by function `fn`.
 * If argument `y` have `OK` type then mapping function fn won't be invoked and result will be returned as is.
 * This allows chaining map operations on `Result` sum-type
 * @argument fn function `T1 => Result<T2>` which maps value to another Result
 * @argument y Result<T1> argument to map
 * xreturns Result T
 * @example
 * ```
 * const a = ok(2);
 * const res = pipe(
 *  chainErrorR(x => ok(x + 2)),
 *  mapR(x => x * 3),
 * )(a);
 * // result OK(6)
 * const b = err('some error');
 * const res = pipe(
 *  mapR(x => x + 1),
 *  chainR(x => ok(5)),
 *  mapR(x => x * 3),
 * )(b);
 * // result Error(15)
 * ```
 */
export const chainErrorR = <T>(fn: (x: any) => Result<T>) => (y: Result<T>): Result<T> =>
  isErr(y) ? fn(y.error) : y;

// utility functions to work with results usually Result.map(somRamdaFun)

/**
 * xfunction propR
 * Given property name and Result will extract value of the property `p` from 'Result` value if it is `ok`.
 * @argument p string (keyof T) - property name of the type T1
 * @argument r Result T - result with value of type T
 * xreturns Result T[P] - result with value of the property `p` from value of arg `r`
 * @example
 * ```
 * const a = ok({a: 1, b: 2});
 * const res = pipe(
 *  propR('a'),
 *  mapR(x => x * 3),
 * )(a);
 * // result OK(3)
 * ```
 */
export type PropR = <T, P extends keyof T>(p: P) => (r: Result<T>) => Result<T[P]>;
export const propR: PropR = p => mapR(prop(p) as any);

/**
 * xfunction mapPropR
 * Same as propR but add mapping after the receiving result of propR.
 * This is convenience function, could be replaced by `pipe(propR(p), mapR(f))`
 * @example
 * ```
 * const a = ok({a: 1, b: 2});
 * const res = propMapR('a', x => x * 3)(a);
 * // result OK(3)
 */
export type MapPropR = <T, P extends keyof T, T1>(p: P, f: ((x: T[P]) => T1)) => (r: Result<T>) => Result<T1>;
// @obsolete use propMapR
export const mapPropR: MapPropR = (p, f) => pipe(propR(p), mapR(f));
export const propMapR = mapPropR;

// @obsolete
export const runPropR = (p, f) => r => f(mapR(prop(p))(r));


/**
 * xfunction ok2array
 * Given `Result` will map it with `f` function to the new value
 * and then return array with the single element (resulted value).
 * If `Result` has `Error` type then empty array will be returned.
 * Useful in effects when it is required to return different sets of actions depending of the pervious result.
 * @argument f `T => T1` - mapping function
 * @argument r Result T - result with value of type T
 * xreturns T1[] - result with either single or none values
 * @example
 * ```
 * const actions$ = Observable.of(ok(1));
 * actions$.flatMap(ok2array(someAction));
 * // will emit someAction(1);
 * const actions1$ = Observable.of(err('some error'));
 * actions$.flatMap(ok2array(someAction));
 * // will emit no actions;
 * const actions2$ = Observable.of(ok(1));
 * actions$.flatMap(x => [...ok2array(someAction)(x), anotherAction()]));
 * // will emit someAction(1); anotherAction();
 * const actions3$ = Observable.of(err('some error'));
 * actions$.flatMap(x => [...ok2array(someAction)(x), anotherAction()]));
 * // will emit anotherAction();
 * ```
 */
export const ok2array = <T, T1>(f: ((x: T) => T1)) => (result: Result<T>): T1[] => isOK(result) ? [f(result.value)] : [];


/**
 * xfunction sequenceR
 * https://fsharpforfunandprofit.com/posts/elevated-world-4/
 * Given `array` of `Result` will translate them to `Result` of `array`.
 * Useful when dealing with batch of the results. Example: if there is a batch of requests to server and each
 * of the responses have `Result` type i.e. Array<Result> it is convenient to convert this array to single `Result`
 * with array inside and then continue to work with it as common `Result`.
 * @argument list `Array<Result<T>>` - array of results
 * xreturns Result<T[]> - if all `Result`s in list were `OK` then will return `OK` result with arrays of values inside.
 * @example
 * ```
 * const arr = [ok(1), ok(2)];
 * const r = sequenceR(arr);
 * if (isOk(r)) {
 *    //1, 2
 *    console.log(r.value);
 * }
 * const arr = [ok(1), err('err 1'), err('err 2')];
 * const r = sequenceR(arr);
 * if (isErr(r)) {
 *    //err1, err2
 *    console.log(r.error);
 * }
 * ```
 */
export const sequenceR = <T>(list: Array<Result<T>>): Result<T[]> =>
  reduce(
    (acc: any, x: any) => {
      if (isOK(acc) && isOK(x)) {
        return ok([...acc.value as any, x.value]);
      } else if (isErr(acc) && isErr(x)) {
        return err([...acc.error, x.error]);
      } else if (isErr(acc)) {
        return acc;
      } else if (isErr(x)) {
        return err([x.error]);
      }
    },
    ok([]),
    list
  );

/**
 * xfunction lift2R
 * https://fsharpforfunandprofit.com/posts/elevated-world/#lift
 * Given function with 2 arguments (curried) and two arguments of the sum-type `Result`, will invoke given function
 * only if both arguments have `OK` type, result of the function will be return as `OK` type.
 * If any of the arguments has `Error` type this result will be returned as is i.e. `Error`.
 * @argument f `S => S1 => S2` 2 arguments function
 * @argument a - Result<S> argument of type `Result`
 * @argument b - Result<S1> argument of type `Result`
 * xreturns OK(S2) if both a and b is `OK` and `Error` if any of them is `Error`
 * @example
 * ```
 * const a = ok(1);
 * const b = ok(2);
 * const add = x => y => x + y;
 * const _add = lift2(add)
 * // OK(3)
 * _add(a)(b)
 * ///
 * const a1 = ok(1);
 * const b1 = err('some error');
 * // err('some error')
 * _add(a1)(b1)
 * ///
 * const a2 = err('some error 1');
 * const b2 = err('some error 2');
 * // err('some error 1')
 * _add(a2)(b2)
 * ```
 */
export const lift2R = <S, S1, S2>(f: ((x: S) => (y: S1) => S2)) => (a: Result<S>) => (b: Result<S1>): Result<S2> =>
  isOK(a) && isOK(b) ? ok(f(a.value)(b.value)) : (isErr(a) ? a : b) as any;

/**
 * xfunction lift3R
 * https://fsharpforfunandprofit.com/posts/elevated-world/#lift
 * Given function with 3 arguments (curried) and 3 arguments of the sum-type `Result`, will invoke given function
 * only if all arguments have `OK` type, result of the function will be return as `OK` type.
 * If any of the arguments has `Error` type this result will be returned as is i.e. `Error`.
 * @argument f `S => S1 => S2 => S3` 3 arguments function
 * @argument a - Result<S> argument of type `Result`
 * @argument b - Result<S1> argument of type `Result`
 * @argument c - Result<S2> argument of type `Result`
 * xreturns OK(S3) if both a and b is `OK` and `Error` if any of them is `Error`
 * @example
 * ```
 * const a = ok(1);
 * const b = ok(2);
 * const c = ok(3);
 * const add = x => y => z => x + y + z;
 * const _add = lift3(add)
 * // OK(6)
 * _add(a)(b)(c)
 * ///
 * const a1 = ok(1);
 * const b1 = err('some error');
 * const c1 = ok(2);
 * // err('some error')
 * _add(a1)(b1)(c1)
 * ///
 * const a2 = err('some error 1');
 * const b2 = err('some error 2');
 * const b2 = err('some error 3');
 * // err('some error 1')
 * _add(a2)(b2)(c2)
 * ```
 */
export const lift3R = <S, S1, S2, S3>(f: ((x: S) => (y: S1) => (z: S2) => S3)) => (a: Result<S>) => (b: Result<S1>) => (c: Result<S2>): Result<S3> =>
  isOK(a) && isOK(b) && isOK(c) ? ok(f(a.value)(b.value)(c.value)) : (isErr(a) ? a : (isErr(b) ? b : c)) as any;
