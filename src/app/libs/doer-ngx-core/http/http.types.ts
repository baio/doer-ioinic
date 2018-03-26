export interface HttpError {
    code: number | "CONNECTION_LOST";
    msg: string;
}

export interface HttpConfig {
    baseUrl: string;
  }
