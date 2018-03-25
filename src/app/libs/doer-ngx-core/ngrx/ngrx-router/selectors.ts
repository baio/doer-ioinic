import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl, RouterStateOutlet } from '../ngrx.types';
import { reduce, chain, pipe, map, prop, flatten, path, reject, isNil, reverse, pathOr, ifElse, always, uniq, head, tap, propOr, omit, project} from 'ramda';


export { MemoizedSelector };
export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');


const collectChildren = (x: RouterStateOutlet) =>
    [ x.children, ...pipe( prop('children'), map(collectChildren), flatten)(x) ];

type TraversePath = <T>(fn: (x: Array<RouterReducerState<RouterStateUrl>>) => T[]) =>
    (router: RouterReducerState<RouterStateUrl>) => T[];
const traversePath: TraversePath = fn => router =>
    pipe(
        path(['state', 'root']),
        ifElse(isNil, always([]), collectChildren),
        fn,
        reverse as any
    )(router) as any;


const getIdPath = traversePath(
    pipe(
        chain(path(['params', 'id'])),
        reject(isNil),
        (x: string[]) => uniq(x)
    )
);


const getPathData = pipe(
    traversePath(chain(path(['data']))),
    (x: any[]) => head(x)
);

const getSegments = pipe(
    traversePath(
        pipe(
            flatten,
            map(omit(['children']))
        )
    )
);


export const selectRouterIdPath = createSelector(selectRouterState, getIdPath);
export const selectRouterData = createSelector(selectRouterState, getPathData);
export const selectRouterSegments = createSelector(selectRouterState, getSegments);
