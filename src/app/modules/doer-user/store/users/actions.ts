import { IAction, action, isAction, IResultAction, resultAction, isResultAction } from '@doer/core';
import { FormAction } from '@doer/ngx-core';
import { UsersList } from './types';

type LoadUsersActionType = '[doer-user] load users action';
export const loadUsersActionConst = '[doer-user] load users action';
export type LoadUsersAction = IAction<LoadUsersActionType, void>;
export const loadUsersAction = action<LoadUsersActionType, void>(
    loadUsersActionConst
);
export const isLoadUsersAction = isAction<LoadUsersActionType, void>(
    loadUsersActionConst
);

type LoadUsersResultActionType = '[doer-user] load users result action';
export const loadUsersResultActionConst = '[doer-user] load users result action';
export type LoadUsersResultAction = IResultAction<LoadUsersResultActionType, UsersList>;
export const loadUsersResultAction = resultAction<LoadUsersResultActionType, UsersList>(
    loadUsersResultActionConst
);
export const isLoadUsersResultAction = isResultAction<LoadUsersResultActionType, UsersList>(
    loadUsersResultActionConst
);

export type Action = LoadUsersAction | LoadUsersResultAction;
