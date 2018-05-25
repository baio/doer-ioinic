import { IAction, action, isAction, IResultAction, resultAction, isResultAction } from '@doer/core';
import { FormAction } from '@doer/ngx-core';
import { UsersList, AddPhotoResult } from './types';

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

type UpdateUserAvatarActionType = '[doer-user] update user avatar action';
export const updateUserAvatarActionConst = '[doer-user] update user avatar action';
export type UpdateUserAvatarAction = IAction<UpdateUserAvatarActionType, void>;
export const updateUserAvatarAction = action<UpdateUserAvatarActionType, void>(
    updateUserAvatarActionConst
);
export const isupdateUserAvatarAction = isAction<UpdateUserAvatarActionType, void>(
    updateUserAvatarActionConst
);


type AddWorkerPhotoActionType = '[doer-user] add worker photo action';
export const addWorkerPhotoActionConst = '[doer-user] add worker photo action';
export type AddWorkerPhotoAction = IAction<AddWorkerPhotoActionType, string>;
export const addWorkerPhotoAction = action<AddWorkerPhotoActionType, string>(
    addWorkerPhotoActionConst
);
export const isAddWorkerPhotoAction = isAction<AddWorkerPhotoActionType, string>(
    addWorkerPhotoActionConst
);

type AddWorkerPhotoResultActionType = '[doer-user] add worker photo result action';
export const addWorkerPhotoResultActionConst = '[doer-user] add worker photo result action';
export type AddWorkerPhotoResultAction = IResultAction<AddWorkerPhotoResultActionType, AddPhotoResult>;
export const addWorkerPhotoResultAction = resultAction<AddWorkerPhotoResultActionType, AddPhotoResult>(
    addWorkerPhotoResultActionConst
);
export const isAddWorkerPhotoResultAction = isResultAction<AddWorkerPhotoResultActionType, AddPhotoResult>(
    addWorkerPhotoResultActionConst
);

export type Action = LoadUsersAction | LoadUsersResultAction | AddWorkerPhotoAction
    | AddWorkerPhotoResultAction |  UpdateUserAvatarAction;
