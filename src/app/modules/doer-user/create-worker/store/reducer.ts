import { ActionReducer } from '@ngrx/store';
import * as fromActions from './actions';
import { assoc, pipe, curryN, assocPath } from 'ramda';
import {
  FormState,
  subFormReduceWrap,
  defaultFormState,
  formReducer as subFormReducer
} from '../../../../libs/doer-ngx-core';

export interface FormStateDemo {
  subForm: FormState;
}

export interface FormStore {
  ngrxForm: FormStateDemo;
}

const wrap = subFormReduceWrap<FormStateDemo, 'subForm'>('subForm');

const defaultState = {
  subForm: defaultFormState
};
// : ActionReducer<ListState>
export function formReducer(state = defaultState, action: fromActions.Action) {
  switch (action.type) {
    case fromActions.subFormActionConst:
      return wrap(subFormReducer(action.payload))(state);
    default:
      return state;
  }
}

export const reducers = {
  ngrxForm: formReducer
};
