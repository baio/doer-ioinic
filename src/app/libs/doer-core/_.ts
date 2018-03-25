/**
 * Simple helper functions
 */
import { not, isNil, compose } from 'ramda';

export type Fun<T1, T2> =  (x: T1) => T2;

export const assertUnreachable = (x: never): never => {
    throw new Error(`Didn't expect to get here ${x}`);
  };

export type NotNil = <T>(x: T|null) => boolean;
export const notNil: NotNil = compose(isNil, not);

export type Pairwise = <T1, T2>(f: Fun<T1, T2>) => (x: T1) => Fun<T1, [T1, T2]>;
export const pairwise: Pairwise = f => x => y => [x, f(y)];

export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};
