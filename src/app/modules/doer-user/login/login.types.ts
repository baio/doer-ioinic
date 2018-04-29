import { FormState } from "../../../libs/doer-ngx-core";

export interface LoginFormState {
    subForm: FormState;
}

export interface LoginFormStore {
    loginForm: LoginFormState;
}