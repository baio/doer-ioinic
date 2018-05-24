import { ActionReducer } from '@ngrx/store';
import * as A from './actions';
import { assoc, pipe, curryN, assocPath, flip, prop } from 'ramda';
import { UsersList } from './types';
import { isOK } from '@doer/core';

const defaultState: UsersList = {
  items: []
};

export const reducer: ActionReducer<UsersList> = (state = defaultState, action: A.Action) => {
  switch (action.type) {
    case A.loadUsersResultActionConst:
        if (isOK(action.payload)) {
            return assoc('items', action.payload.value.items, state);
        } else {
            return state;
        }
    default:
        return state;
  }
}

