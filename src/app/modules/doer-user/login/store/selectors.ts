import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginFormState } from '../login.types';

export const selectFormState = createFeatureSelector<LoginFormState>('loginForm');

export const selectFormSubState = createSelector(selectFormState, x => x.subForm);
