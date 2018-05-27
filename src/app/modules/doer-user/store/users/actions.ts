import { IAction, action, isAction, IResultAction, resultAction, isResultAction } from '@doer/core';
import { FormAction } from '@doer/ngx-core';
import { Users, AddPhotoResult, User } from './types';

type LoadUsersActionType = '[doer-user] load users';
export const loadUsersActionConst = '[doer-user] load users';
export type LoadUsersAction = IAction<LoadUsersActionType, void>;
export const loadUsersAction = action<LoadUsersActionType, void>(
    loadUsersActionConst
);
export const isLoadUsersAction = isAction<LoadUsersActionType, void>(
    loadUsersActionConst
);

type LoadUsersResultActionType = '[doer-user] load users result';
export const loadUsersResultActionConst = '[doer-user] load users result';
export type LoadUsersResultAction = IResultAction<LoadUsersResultActionType, Users>;
export const loadUsersResultAction = resultAction<LoadUsersResultActionType, Users>(
    loadUsersResultActionConst
);
export const isLoadUsersResultAction = isResultAction<LoadUsersResultActionType, Users>(
    loadUsersResultActionConst
);

// TODO: UpdatePrincipalAvatar !
type UpdatePrincipalAvatarActionType = '[doer-user] update principal avatar';
export const updatePrincipalAvatarActionConst = '[doer-user] update principal avatar';
export type UpdatePrincipalAvatarAction = IAction<UpdatePrincipalAvatarActionType, void>;
export const updatePrincipalAvatarAction = action<UpdatePrincipalAvatarActionType, void>(
    updatePrincipalAvatarActionConst
);
export const isUpdatePrincipalAvatarAction = isAction<UpdatePrincipalAvatarActionType, void>(
    updatePrincipalAvatarActionConst
);

interface SetUserAvatarActionPayload { userId: string; avatar: string; }
type SetUserAvatarActionType = '[doer-user] set user avatar';
export const setUserAvatarActionConst = '[doer-user] set user avatar';
export type SetUserAvatarAction = IAction<SetUserAvatarActionType, SetUserAvatarActionPayload>;
export const setUserAvatarAction = action<SetUserAvatarActionType, SetUserAvatarActionPayload>(
    setUserAvatarActionConst
);
export const isSetUserAvatarAction = isAction<SetUserAvatarActionType, SetUserAvatarActionPayload>(
    setUserAvatarActionConst
);


type AddWorkerPhotoActionType = '[doer-user] add worker photo';
export const addWorkerPhotoActionConst = '[doer-user] add worker photo';
export type AddWorkerPhotoAction = IAction<AddWorkerPhotoActionType, string>;
export const addWorkerPhotoAction = action<AddWorkerPhotoActionType, string>(
    addWorkerPhotoActionConst
);
export const isAddWorkerPhotoAction = isAction<AddWorkerPhotoActionType, string>(
    addWorkerPhotoActionConst
);

type AddWorkerPhotoResultActionType = '[doer-user] add worker photo result';
export const addWorkerPhotoResultActionConst = '[doer-user] add worker photo result';
export type AddWorkerPhotoResultAction = IResultAction<AddWorkerPhotoResultActionType, AddPhotoResult>;
export const addWorkerPhotoResultAction = resultAction<AddWorkerPhotoResultActionType, AddPhotoResult>(
    addWorkerPhotoResultActionConst
);
export const isAddWorkerPhotoResultAction = isResultAction<AddWorkerPhotoResultActionType, AddPhotoResult>(
    addWorkerPhotoResultActionConst
);

type ChangeWorkerAvatarActionType = '[doer-user] change worker avatar';
export const changeWorkerAvatarActionConst = '[doer-user] change worker avatar';
export type ChangeWorkerAvatarAction = IAction<ChangeWorkerAvatarActionType, string>;
export const changeWorkerAvatarAction = action<ChangeWorkerAvatarActionType, string>(
    changeWorkerAvatarActionConst
);
export const isChangeWorkerAvatarAction = isAction<ChangeWorkerAvatarActionType, string>(
    changeWorkerAvatarActionConst
);

type ChangeWorkerAvatarResultActionType = '[doer-user] change worker avatar result';
export const changeWorkerAvatarResultActionConst = '[doer-user] change worker avatar result';
export type ChangeWorkerAvatarResultAction =
    IResultAction<ChangeWorkerAvatarResultActionType, SetUserAvatarActionPayload>;
export const changeWorkerAvatarResultAction =
    resultAction<ChangeWorkerAvatarResultActionType, SetUserAvatarActionPayload>(
        changeWorkerAvatarResultActionConst
);
export const isChangeWorkerAvatarResultAction =
    isResultAction<ChangeWorkerAvatarResultActionType, SetUserAvatarActionPayload>(
        changeWorkerAvatarResultActionConst
);

type AppendWorkerActionType = '[doer-user] append worker';
export const appendWorkerActionConst = '[doer-user] append worker';
export type AppendWorkerAction = IAction<AppendWorkerActionType, Partial<User>>;
export const appendWorkerAction = action<AppendWorkerActionType, Partial<User>>(
    appendWorkerActionConst
);
export const isAppendWorkerAvatarAction = isAction<AppendWorkerActionType, Partial<User>>(
    appendWorkerActionConst
);

export type Action = LoadUsersAction | LoadUsersResultAction | AddWorkerPhotoAction
    | AddWorkerPhotoResultAction |  UpdatePrincipalAvatarAction | SetUserAvatarAction
    | ChangeWorkerAvatarAction | ChangeWorkerAvatarResultAction | AppendWorkerAction;
