export type UserId = string;
export type UserName = string;
export type WebToken = string;

export interface Principal {
    id: UserId;
    name: UserName;
}

export interface IAuth {
    principal: Principal|null;
    setTokens(userToken: WebToken, accessToken: WebToken): void;
}