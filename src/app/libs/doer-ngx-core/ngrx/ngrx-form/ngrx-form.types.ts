import { StateWithStatus } from '../ngrx.types';

/// Form Status

/**
 * Actual state of list: initial
 */
export interface FormStateStatusInitial {
  kind: 'FormStateStatusInitial';
}
/**
 * Actual state of list: loading
 */
export interface FormStateStatusLoading {
  kind: 'FormStateStatusLoading';
}
/**
 * Actual state of list: loaded. May be loaded with error.
 */
export interface FormStateStatusLoaded {
  kind: 'FormStateStatusLoaded';
  latestError: string | null;
}
/**
 * Actual state of list: loading
 */
export interface FormStateStatusUpdating {
  kind: 'FormStateStatusUpdating';
}
/**
 * Actual state of list: loaded. May be loaded with error.
 */
export interface FormStateStatusUpdated {
  kind: 'FormStateStatusUpdated';
  latestError: string | null;
}

/**
 * Provides status of ListState: initial, loading or loaded
 */
export type FormStateStatus =
  | FormStateStatusInitial
  | FormStateStatusLoaded
  | FormStateStatusLoading
  | FormStateStatusUpdated
  | FormStateStatusUpdating;

export type FormStateStatusKind =
  | 'FormStateStatusInitial'
  | 'FormStateStatusLoading'
  | 'FormStateStatusLoaded'
  | 'FormStateStatusUpdating'
  | 'FormStateStatusUpdated';

///

export interface FormData {
  [key: string]: any;
}

export interface FormState extends StateWithStatus {
  data: FormData;
  status: FormStateStatus;
}
