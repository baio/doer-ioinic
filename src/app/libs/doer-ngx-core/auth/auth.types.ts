export interface Principal {
  id: string;
  name: string;
  avatar: string|null;
}

export interface MockAuthConfig {
  token: string;
  principal: Principal;
}

export interface AuthConfigMock {
  kind: 'AuthConfigMock';
  val: MockAuthConfig;
}

export interface AuthConfigAuth0 {
  kind: 'AuthConfigOAuth';
  val: any;
}

export type AuthConfig = AuthConfigMock | AuthConfigAuth0;


export interface Tokens {
  userToken: string;
  accessToken: string;
  refreshToken: string;
}
