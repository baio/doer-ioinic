import { ActivatedRouteSnapshot, RouterStateSnapshot, Params } from '@angular/router';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import { prop } from 'ramda';
import { RouterSegment, RouterStateOutlet, RouterStateUrl } from '../ngrx.types';


type MapChildSnapshot = (snapshot: ActivatedRouteSnapshot) => RouterStateOutlet;
const mapChildSnapshot: MapChildSnapshot = snapshot => ({
  name: snapshot.outlet,
  queryParams: snapshot.queryParams,
  params: snapshot.params,
  path: snapshot.url.map(prop('path')),
  children: snapshot.children.map(mapChildSnapshot),
  data: snapshot.data
});

export interface CustomRouterState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export class CustomRouterSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {

    const { url } = routerState;
    const { queryParams } = routerState.root;

    const state: ActivatedRouteSnapshot = routerState.root;
    const root = mapChildSnapshot(state);

    return { url, root };
  }
}
