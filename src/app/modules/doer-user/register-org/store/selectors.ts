import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegisterOrgFormState } from '../register-org.types';

export const selectFormState = createFeatureSelector<RegisterOrgFormState>('registerOrgForm');

export const selectFormSubState = createSelector(selectFormState, x => x.subForm);
