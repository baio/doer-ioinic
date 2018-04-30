import { Principal } from "../../auth/auth.types";

export interface AuthState {
    principal: Principal
}

export interface AuthStore {
    auth: AuthState
}
