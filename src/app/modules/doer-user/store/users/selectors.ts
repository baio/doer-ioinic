import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersList, UserTypes } from './types';
import { filter, propEq, evolve, identity } from 'ramda';

export const selectUsers = createFeatureSelector<UsersList>('users');

type SelectType = (type: UserTypes) => (list: UsersList) => UsersList;
const selectType: SelectType = type => evolve({ items : filter(propEq('kind', type)) });

export const selectWorkers = createSelector(selectUsers, selectType('Worker'));

export const selectMasters = createSelector(selectUsers, selectType('Master'));
