import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CreateWorkerFormState } from '../create-worker.types';

export const selectFormState = createFeatureSelector<CreateWorkerFormState>(
  'createWorkerForm'
);

export const selectFormSubState = createSelector(
  selectFormState,
  x => x.subForm
);
