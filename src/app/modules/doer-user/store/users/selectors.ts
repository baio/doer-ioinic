import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersList, UserTypes, User } from './types';
import { filter, propEq, evolve, identity, find, pipe, prop } from 'ramda';

export const selectUsers = createFeatureSelector<UsersList>('users');

type SelectType = (type: UserTypes) => (list: UsersList) => UsersList;
const selectType: SelectType = type => evolve({ items : filter(propEq('role', type)) });

export const selectWorkers = createSelector(selectUsers, selectType('Worker'));

export const selectMasters = createSelector(selectUsers, selectType('Master'));

export const selectUser = (id: string) =>
    createSelector(selectUsers, pipe(prop('items'), find<User>(propEq('id', id))));
