export interface TuyaTokensSave {
  access_token: string;
  refresh_token: string;
  expire_time: string;
  uid: string;
}

export interface TuyaTokenStorInterface {
  setTokens(tokens: TuyaTokensSave): Promise<boolean>;
  getAccessToken(): Promise<string | undefined>;
  getRefreshToken(): Promise<string | undefined>;
}

