export * from './ngrx.types';
export * from './ngrx-form';
export * from './ngrx-auth';

import { RouterEffects } from './ngrx-router/effects';
import { ActionReducerMap } from '@ngrx/store';

import { authReducer } from './ngrx-auth/reducer';
import { AuthStore } from './ngrx-auth/ngrx-auth.types';

const effects: any[] = [ RouterEffects ];
const reducers = {
  auth: authReducer
};
// https://github.com/angular/angular-cli/issues/4440
export class NgrxConstants {
  public static EFFECTS = effects;
  public static REDUCERS = reducers;
}
