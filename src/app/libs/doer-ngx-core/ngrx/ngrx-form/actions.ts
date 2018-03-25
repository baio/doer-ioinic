import { action, isAction, IAction, IResultAction, resultAction, isResultAction } from '../../../doer-core';

export type LoadFormActionType = '[ngx-core] load form action';
export const loadFormActionConst = '[ngx-core] load form action';
export type LoadFormAction = IAction<LoadFormActionType, void>;
export const loadFormAction = action<LoadFormActionType, void>(loadFormActionConst);
export const isLoadFormAction = isAction<LoadFormActionType, void>(loadFormActionConst);

export type LoadFormResultActionType = '[ngx-core] load form result action';
export const loadFormResultActionConst = '[ngx-core] load form result action';
export type LoadFormResultAction = IResultAction<LoadFormResultActionType, any>;
export const loadFormResultAction = resultAction<LoadFormResultActionType, any>(loadFormResultActionConst);
export const isLoadFormResultAction = isResultAction<LoadFormResultActionType, any>(loadFormResultActionConst);

export type SaveFormActionType = '[ngx-core] save form action';
export const saveFormActionConst = '[ngx-core] save form action';
export type SaveFormAction = IAction<SaveFormActionType, any>;
export const saveFormAction = action<SaveFormActionType, any>(saveFormActionConst);
export const isSaveFormAction = isAction<SaveFormActionType, any>(saveFormActionConst);

export type SaveFormResultActionType = '[ngx-core] save form result action';
export const saveFormResultActionConst = '[ngx-core] save form result action';
export type SaveFormResultAction = IResultAction<SaveFormResultActionType, any>;
export const saveFormResultAction = resultAction<SaveFormResultActionType, any>(saveFormResultActionConst);
export const isSaveFormResultAction = isResultAction<SaveFormResultActionType, any>(saveFormResultActionConst);

export type FormValueChangedActionType = '[ngx-core] form value changed action';
export const formValueChangedActionConst = '[ngx-core] form value changed action';
export type FormValueChangedAction = IAction<FormValueChangedActionType, any>;
export const formValueChangedAction = action<FormValueChangedActionType, any>(formValueChangedActionConst);
export const isFormValueChangedAction = isAction<FormValueChangedActionType, any>(formValueChangedActionConst);

export type FormCancelEditActionType = '[ngx-core] form cancel edit action';
export const formCancelEditActionConst = '[ngx-core] form cancel edit action';
export type FormCancelEditAction = IAction<FormCancelEditActionType, any>;
export const formCancelEditAction = action<FormCancelEditActionType, any>(formCancelEditActionConst);
export const isFormCancelEditAction = isAction<FormCancelEditActionType, any>(formCancelEditActionConst);

export interface FormRouteParamChangedPayload { [key: string]: any; }
export type FormRouteParamChangedType = '[ngx-Core] form route param changed';
export const formRouteParamChangedConst = '[ngx-Core] form route param changed';
export type FormRouteParamChangedAction = IAction<FormRouteParamChangedType, FormRouteParamChangedPayload>;
export const formRouteParamChangedAction = action<FormRouteParamChangedType, FormRouteParamChangedPayload>(formRouteParamChangedConst);
export const isFormRouteParamChangedAction = isAction<FormRouteParamChangedType, FormRouteParamChangedPayload>(formRouteParamChangedConst);

export type ResetFormActionType = '[ngx-core] reset form action';
export const resetFormActionConst = '[ngx-core] reset form action';
export type ResetFormAction = IAction<ResetFormActionType, void>;
export const resetFormAction = action<ResetFormActionType, void>(resetFormActionConst);
export const isResetFormAction = isAction<ResetFormActionType, void>(resetFormActionConst);

export type FormAction =
  LoadFormAction | LoadFormResultAction | FormValueChangedAction | FormCancelEditAction
  | FormRouteParamChangedAction | SaveFormAction | SaveFormResultAction | ResetFormAction;
