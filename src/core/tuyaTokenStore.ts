import { TuyaTokensSave, TuyaTokenStorInterface  } from '../interfaces';
class MemoryStore implements TuyaTokenStorInterface {
  private tokens: TuyaTokensSave | undefined;

  async setTokens(tokens: TuyaTokensSave): Promise<boolean> {
    this.tokens = tokens;
    return true;
  }

  async getAccessToken(): Promise<string | undefined> {
    if (this.tokens && this.tokens.access_token) {
      return this.tokens.access_token;
    }
    return undefined;
  }

  async getRefreshToken(): Promise<string | undefined> {
    if (this.tokens && this.tokens.refresh_token) {
      return this.tokens.refresh_token;
    }
    return undefined;
  }

}

export default MemoryStore;
export {
  MemoryStore,
};
