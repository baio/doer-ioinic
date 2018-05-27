import { IAction, action, isAction, IResultAction, resultAction, isResultAction } from '@doer/core';
import { FormAction } from '@doer/ngx-core';
import { Users, AddPhotoResult } from './types';

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
export type LoadUsersResultAction = IResultAction<LoadUsersResultActionType, Users>;
export const loadUsersResultAction = resultAction<LoadUsersResultActionType, Users>(
    loadUsersResultActionConst
);
export const isLoadUsersResultAction = isResultAction<LoadUsersResultActionType, Users>(
    loadUsersResultActionConst
);

// TODO: UpdatePrincipalAvatar !
type UpdateUserAvatarActionType = '[doer-user] update user avatar action';
export const updateUserAvatarActionConst = '[doer-user] update user avatar action';
export type UpdateUserAvatarAction = IAction<UpdateUserAvatarActionType, void>;
export const updateUserAvatarAction = action<UpdateUserAvatarActionType, void>(
    updateUserAvatarActionConst
);
export const isUpdateUserAvatarAction = isAction<UpdateUserAvatarActionType, void>(
    updateUserAvatarActionConst
);

interface SetUserAvatarActionPayload { userId: string; avatar: string; }
type SetUserAvatarActionType = '[doer-user] set user avatar action';
export const setUserAvatarActionConst = '[doer-user] set user avatar action';
export type SetUserAvatarAction = IAction<SetUserAvatarActionType, SetUserAvatarActionPayload>;
export const setUserAvatarAction = action<SetUserAvatarActionType, SetUserAvatarActionPayload>(
    setUserAvatarActionConst
);
export const issetUserAvatarAction = isAction<SetUserAvatarActionType, SetUserAvatarActionPayload>(
    setUserAvatarActionConst
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
    | AddWorkerPhotoResultAction |  UpdateUserAvatarAction | SetUserAvatarAction;
