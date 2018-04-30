import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl, RouterStateOutlet } from '../ngrx.types';
import { AuthState } from './ngrx-auth.types';


export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectPrincipal = createSelector(selectAuthState, x => x.principal);
