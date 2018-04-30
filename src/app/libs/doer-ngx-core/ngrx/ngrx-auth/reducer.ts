import { ActionReducer } from '@ngrx/store';
import * as A from './actions';
import { AuthState } from './ngrx-auth.types';
import { ASTWithSource } from '@angular/compiler';
import { assoc } from 'ramda';

export const defaultAuthState: AuthState = {
  principal: null
};

// : ActionReducer<ListState>
export const authReducer = (state = defaultAuthState, action: A.Actions): AuthState => {
  switch (action.type) {
    case A.loginSuccessConst:
      return assoc('principal', action.payload, state);
    default:
      return state;
  }
}

