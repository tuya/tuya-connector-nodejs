import { TuyaOpenApiClient } from '../core/client';
import { TuyaResponse } from '../interfaces';

interface TuyaOpenApiUserGetParam {
  user_id: string;
}

interface TuyaOpenApiUserGetResult {
  user_id: string;
  user_name: string;
  country_code: string;
}

interface TuyaOpenApiUserRegisterParam {
  username: string;
  password: string;
  country_code: string;
}

interface TuyaOpenApiUserRegisterResult {
  user_id: string;
}

interface TuyaOpenApiUserDeleteParam {
  user_id: string;
}


interface TuyaOpenApiUserChangePasswordParam {
  user_id: string;
  old_password: string;
  new_password: string;
}

interface TuyaOpenApiUserUsersParam {
  last_row_key?: string;
  page_size?: number;
}

interface TuyaOpenApiUserUsersResult {
  list: {
    user_name: string;
    country_code: string;
    user_id: string;
  }[];
  last_row_key: string;
  page_size: number;
}

class TuyaOpenApiUserService {
  private client: TuyaOpenApiClient;

  constructor(client: TuyaOpenApiClient) {
    this.client = client;
  }


  async getUser(param: TuyaOpenApiUserGetParam): Promise<TuyaResponse<TuyaOpenApiUserGetResult>> {
    const res = await this.client.request<TuyaOpenApiUserGetResult>({
      path: `/v1.0/iot-02/users/${param.user_id}`,
      method: 'GET',
      body: param,
    });
    return res.data;
  }
  async registerUser(param: TuyaOpenApiUserRegisterParam): Promise<TuyaResponse<TuyaOpenApiUserRegisterResult>> {
    const res = await this.client.request<TuyaOpenApiUserRegisterResult>({
      path: `/v1.0/iot-02/users`,
      method: 'POST',
      query: param,
    });
    return res.data;
  }
  
  async deleteUser(param: TuyaOpenApiUserDeleteParam): Promise<TuyaResponse<boolean>> {
    const res = await this.client.request<boolean>({
      path: `/v1.0/iot-02/users${param.user_id}`,
      method: 'POST',
    });
    return res.data;
  }

  async changePassword (param: TuyaOpenApiUserChangePasswordParam): Promise<TuyaResponse<boolean>> {
    const res = await this.client.request<boolean>({
      path: `/v1.0/iot-02/users/${param.user_id}`,
      method: 'PUT',
      query: param,
    });
    return res.data;
  }

  async users(param: TuyaOpenApiUserUsersParam): Promise<TuyaResponse<TuyaOpenApiUserUsersParam>> {
    const res = await this.client.request<TuyaOpenApiUserUsersResult>({
      path: `/v1.0/iot-02/users`,
      method: 'GET',
      query: param,
    });
    return res.data;
  }
}

export {
  TuyaOpenApiUserService
}
export default TuyaOpenApiUserService;
