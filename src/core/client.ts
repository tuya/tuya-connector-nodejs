import crypto from 'crypto';
import axios, { AxiosInstance, Method, AxiosResponse } from 'axios';
import {
  TuyaTokenStorInterface,
  TuyaResponse,
  TuyaResponseGetToken,
  TuyaResponseRefreshToken
} from '../interfaces';
import { MemoryStore } from './tuyaTokenStore';
import { TuyaContextOptions } from '../interfaces';
interface TuyaOpenApiClientOptions extends TuyaContextOptions {
  baseUrl: string;
  accessKey: string;
  secretKey: string;
  store?: TuyaTokenStorInterface;
  rpc?: AxiosInstance;
}

interface TuyaOpenApiClientRequestExtHeader {
  client_id: string;
  t: string;
  sign_method: 'HMAC-SHA256';
  sign: string;
  access_token: string;
}

export interface TuyaOpenApiClientRequestQueryBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}

export interface TuyaOpenApiClientRequestBodyBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}
export interface TuyaOpenApiClientRequestHeaderBase {
  [k: string]: string;
}

export interface TuyaOpenApiClientRequestOptions {
    path: string,
    method: Method,
    body?: TuyaOpenApiClientRequestBodyBase,
    headers?: TuyaOpenApiClientRequestHeaderBase,
    query?: TuyaOpenApiClientRequestQueryBase,
    retry?: boolean,
}
/**
 * TuyaOpenApiResCode.
 *
 * https://developer.tuya.com/cn/docs/iot/open-api/api-reference/error-code/error-code?id=K989ruxx88swc
 */
type TuyaOpenApiResCode = 500 | 1000 | 1010;
interface TuyaOpenApiResponse <T> {
  code: TuyaOpenApiResCode;
  success: boolean;
  msg: null | string;
  result: T;
}
/**
 * TuyaContext.
 */
class TuyaOpenApiClient {
  private readonly baseUrl: string;

  private readonly accessKey: string;

  private readonly secretKey: string;

  private readonly store: TuyaTokenStorInterface;

  private readonly rpc: AxiosInstance;

  constructor(opt: TuyaOpenApiClientOptions) {
    this.baseUrl = opt.baseUrl;
    this.accessKey = opt.accessKey;
    this.secretKey = opt.secretKey;
    this.store = opt.store || new MemoryStore();
    this.rpc = opt.rpc || axios;
  }

  async init(): Promise<TuyaResponse<TuyaResponseGetToken>> {
    const t = Date.now().toString();
    const headers = await this.getHeader(t, true);
    const { data } = await this.rpc({
      url: `${this.baseUrl}/v1.0/token?grant_type=1`,
      method: 'GET',
      headers,
    });
    if (data.success) {
      await this.store.setTokens(data.result);
      return data;
    } else {
      throw new Error(`GET_TOKEN_FAILED ${data.code}, ${data.msg}`);
    }
  }

  async refreshToken(): Promise<TuyaResponse<TuyaResponseRefreshToken>> {
    const t = `${Date.now()}`;
    const refreshToken = await this.store.getRefreshToken();
    const api = `${this.baseUrl}/v1.0/token/${refreshToken}`;
    const headers = await this.getHeader(t, true);
    let { data } = await this.rpc.request({
      url: api,
      method: 'GET',
      headers,
    });
    if (!data.success) {
      data = await this.init();
    }
    await this.store.setTokens(data.result);
    return data;
  }

  /**
   * 请求开放平台接口
   *
   * @param path    接口路径
   * @param method  Http方法
   * @param query   可选参数
   * @param body    可选参数
   * @param headers 可选请求头
   * @param retry   失败是否重试一次，默认true
   */
  async request<T>({ 
    path,
    method,
    query,
    body,
    headers,
    retry = true,
  }: TuyaOpenApiClientRequestOptions)
    : Promise<AxiosResponse<TuyaOpenApiResponse<T>>> {

    const t = Date.now().toString();
    const reqHeaders = await this.getHeader(t, false);
    const param = {
      url: `${this.baseUrl}${path}`,
      method: method,
      params: query,
      data: body,
      headers: Object.assign(reqHeaders, headers),
    };
    let res = await this.rpc.request<TuyaOpenApiResponse<T>>(param);
    if (retry && !res.data.success && res.data.code === 1010) {
      await this.refreshToken();
      res = await this.request({ path, method, query, body, headers, retry: false });
    }
    return res;
  }

  /**
   * refreshSign. 计算刷新 token 的签名
   *
   * @param {string} t 时间戳, 毫秒级
   * @returns {string} 刷新 token 的签名
   */
  refreshSign(t: string): string {
    const str = `${this.accessKey}${t}`;
    return this.sign(str, this.secretKey);
  }

  async requestSign(t: string): Promise<string> {
    let accessToken = await this.store.getAccessToken();
    if (!accessToken) {
      await this.init(); // 未获取到 accessToke 时, 重新初始化
      accessToken = await this.store.getAccessToken();
    }
    const str = `${this.accessKey}${accessToken}${t}`;
    return this.sign(str, this.secretKey);
  }

  sign(str: string, secret: string): string {
    return crypto
      .createHmac('sha256', secret)
      .update(str, 'utf8')
      .digest('hex')
      .toUpperCase();
  }

  async getHeader(t: string, forRefresh = false): Promise<TuyaOpenApiClientRequestExtHeader> {
    const sign = forRefresh ? this.refreshSign(t) : await this.requestSign(t);
    const accessToken = await this.store.getAccessToken();
    return {
      client_id: this.accessKey,
      t,
      sign_method: "HMAC-SHA256",
      sign,
      access_token: accessToken || '',
    };
  }

}

export default TuyaOpenApiClient;
export {
  TuyaOpenApiClientOptions,
  TuyaOpenApiClient,
};
