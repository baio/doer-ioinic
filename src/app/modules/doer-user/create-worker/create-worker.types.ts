import { FormState } from '../../../libs/doer-ngx-core';

export interface CreateWorkerFormState {
  subForm: FormState;
}

export interface CreateWorkerFormStore {
  createWorkerForm: CreateWorkerFormState;
}
