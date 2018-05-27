import { ActionReducer } from '@ngrx/store';
import * as A from './actions';
import { assoc, pipe, curryN, assocPath, flip, prop } from 'ramda';
import { Users } from './types';
import { isOK } from '@doer/core';

const defaultState: Users = {
  items: null
};

export const reducer: ActionReducer<Users> = (
  state = defaultState,
  action: A.Action
) => {
  switch (action.type) {
    case A.loadUsersResultActionConst:
      if (isOK(action.payload)) {
        return assoc('items', action.payload.value.items, state);
      } else {
        return state;
      }
    case A.addWorkerPhotoResultActionConst:
      if (isOK(action.payload)) {
        return assocPath(
          ['items', action.payload.value.userId, 'photosCount'],
          action.payload.value.photosCount,
          state
        );
      } else {
          return state;
      }
    case A.setUserAvatarActionConst:
        return assocPath(
          ['items', action.payload.userId, 'avatar'],
          action.payload.avatar,
          state
        );
    case A.appendWorkerActionConst:
        return assocPath(
          ['items', action.payload.id],
          {...action.payload, kind: 'Worker'},
          state
        );
    default:
      return state;
  }
};
