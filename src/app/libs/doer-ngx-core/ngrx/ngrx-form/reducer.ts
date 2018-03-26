import { ActionReducer } from '@ngrx/store';
import * as A from './actions';
import {
  assoc,
  pipe,
  prop,
  flip,
  assocPath,
  curryN,
  merge,
  path,
  evolve,
  ifElse,
  contains,
  without,
  append,
  mergeDeepLeft
} from 'ramda';
import {
  FormState
} from './ngrx-form.types';
import { reduceStatus, reduceResultWithStatus } from '../reducer-helpers';

// Wrap higher order states into function which transforms it to sub list state (by property)
export type SubFormStateReduceFn = (formState: FormState) => FormState;
export type SubFormReduceWrap = <S, P extends keyof S>(p: P) => (fn: SubFormStateReduceFn) => ((s: S) => S);
export const subFormReduceWrap: SubFormReduceWrap = p => fn =>
  s => pipe(prop(p), fn, x => assoc(p, x, s))(s);


export const defaultFormState: FormState = {
  data: null,
  status: {  kind: 'FormStateStatusInitial' }
};

const reduceData = <S>(state: S) => (data: any): S => assoc('data', data, state);

// : ActionReducer<ListState>
export const formReducer = (action: A.FormAction) => (state = defaultFormState): FormState => {
  switch (action.type) {
    case A.loadFormActionConst:
      return reduceStatus(state)('FormStateStatusLoading', null);
    case A.loadFormResultActionConst:
      return reduceResultWithStatus<FormState>('FormStateStatusLoaded')(reduceData)(state)(action.payload);
    case A.saveFormActionConst:
      return reduceStatus(state)('FormStateStatusUpdating', null);
    case A.saveFormResultActionConst:
      return reduceResultWithStatus<FormState>('FormStateStatusUpdated')(reduceData)(state)(action.payload);
    case A.formValueChangedActionConst:
      return evolve({ data: mergeDeepLeft(action.payload) }, state);
    case A.resetFormActionConst:
      return defaultFormState;
    default:
      return state;
  }
}

