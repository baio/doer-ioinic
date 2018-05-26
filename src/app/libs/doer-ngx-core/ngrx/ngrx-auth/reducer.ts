import { ActionReducer } from '@ngrx/store';
import * as A from './actions';
import { AuthState } from './ngrx-auth.types';
import { ASTWithSource } from '@angular/compiler';
import { assoc, evolve, always, merge, omit } from 'ramda';
import { isOK } from '../../../doer-core';

export const defaultAuthState: AuthState = {
  principal: null
};

// : ActionReducer<ListState>
export const authReducer = (state = defaultAuthState, action: A.Actions): AuthState => {
  switch (action.type) {
    case A.logoutResultConst:
      return isOK(action.payload as any) ? assoc('principal', null, state) : state;
    case A.loginResultConst:
      return isOK(action.payload) ? assoc('principal', action.payload.value, state) : state;
    case A.setAvatarConst:
      return evolve({ principal : { avatar: always(action.payload) }}, state);
    case A.setPrincipalDataConst:
      return evolve({ principal : x => merge(x, action.payload)}, state);
    default:
      return state;
  }
};


