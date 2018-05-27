import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Users, UserTypes, User } from './types';
import { filter, propEq, evolve, identity, find, pipe, prop, path, values } from 'ramda';

export const selectUsers = createFeatureSelector<Users>('users');

export const selectUsersSet = createSelector(selectUsers, x => x.items);

export const selectUsersList = createSelector(selectUsersSet, values);

type SelectType = (type: UserTypes) => (list: User[]) => User[];
const selectType: SelectType = type => filter(propEq('role', type));

export const selectWorkersList = createSelector(selectUsersList, selectType('Worker'));

export const selectMastersList = createSelector(selectUsersList, selectType('Master'));

export const selectUser = (id: string) => createSelector(selectUsersSet, x => x ? x[id] : null);
