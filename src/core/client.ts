import * as qs from 'qs';
import * as crypto from 'crypto';
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
  t: string;
  client_id: string;
  sign_method: 'HMAC-SHA256';
  sign: string;
  access_token: string;
  Dev_channel: string;
  Dev_lang: string;
  path?: string; // axios auto encode
  'Signature-Headers'?: string;
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

  private readonly version: 'v1' | 'v2';

  constructor(opt: TuyaOpenApiClientOptions) {
    this.baseUrl = opt.baseUrl;
    this.accessKey = opt.accessKey;
    this.secretKey = opt.secretKey;
    this.store = opt.store || new MemoryStore();
    this.rpc = opt.rpc || axios;
    this.version = opt.version || 'v2';
  }

  async init(): Promise<TuyaResponse<TuyaResponseGetToken>> {
    const t = Date.now().toString();
    let headers = {};
    switch (this.version) {
      case 'v1':
        headers = await this.getHeader(t, true);
        break;
      case 'v2':
        headers = await this.getHeaderV2(t, true, {}, {});
        break;
    }
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
    const t = Date.now().toString();
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
   * ????????????????????????
   *
   * @param path    ????????????
   * @param method  Http??????
   * @param query   ????????????
   * @param body    ????????????
   * @param headers ???????????????
   * @param retry   ?????????????????????????????????true
   */
  async request<T>({ 
    path,
    method,
    body = {},
    query = {},
    headers = {},
    retry = true,
  }: TuyaOpenApiClientRequestOptions)
    : Promise<AxiosResponse<TuyaOpenApiResponse<T>>> {

    const t = Date.now().toString();
    let reqHeaders: TuyaOpenApiClientRequestExtHeader;
    switch(this.version) {
      case 'v1':
         reqHeaders = await this.getHeader(t, false);
        break;
      case 'v2':
        reqHeaders = await this.getHeaderV2(t, false, headers, body);
    }
    let url = `${this.baseUrl}${path}`;
    if (this.version === 'v2') {
      const { path: encodePath, ...signHeaders } = await this.getSignHeaders(path, method, query, body);
      reqHeaders = Object.assign(reqHeaders, signHeaders);
      url = `${this.baseUrl}${encodePath}`;
    }
    const param = {
      url,
      method: method,
      params: {},
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

  async getSignHeaders(path: string, method: string, query: TuyaOpenApiClientRequestQueryBase, body: TuyaOpenApiClientRequestBodyBase): Promise<TuyaOpenApiClientRequestExtHeader> {
    const t = Date.now().toString();
    // ????????????: querystring ????????????????????? query
    const [uri, pathQuery] = path.split('?');
    const queryMerged = Object.assign(query, qs.parse(pathQuery));
    // query ???????????????????????? form ?????? highway ??????????????????
    const sortedQuery: { [k: string]: string } = {};
    Object.keys(queryMerged).sort().forEach(i => sortedQuery[i] = query[i]);
    const querystring = qs.stringify(sortedQuery);
    const url = querystring ? `${uri}?${querystring}` : uri;
    let accessToken = await this.store.getAccessToken() || '';
    if(!accessToken) {
      await this.init(); // ???????????? accessToke ???, ???????????????
      accessToken = await this.store.getAccessToken() || '';
    }
    const contentHash = crypto.createHash('sha256').update(JSON.stringify(body)).digest('hex');
    const stringToSign = [method, contentHash, '', decodeURIComponent(url)].join('\n');
    const signStr = this.accessKey + accessToken + t + stringToSign;
    return {
      t,
      path: url,
      client_id: this.accessKey,
      sign: this.sign(signStr, this.secretKey),
      sign_method: "HMAC-SHA256",
      access_token: accessToken,
      Dev_channel: 'SaaSFramework',
      Dev_lang: 'Nodejs',
  };
  }

  /**
   * ???????????? token ?????????
   *
   * @param {string} t ?????????, ?????????
   * @returns {string} token ?????????
   */
  refreshSign(t: string): string {
    const str = `${this.accessKey}${t}`;
    return this.sign(str, this.secretKey);
  }

  async refreshSignV2(t: string, headers: TuyaOpenApiClientRequestHeaderBase): Promise<{ sign: string, signHeaders: string }> {
    const nonce = '';
    const method = 'GET';
    const signUrl = '/v1.0/token?grant_type=1';
    const contentHash = crypto.createHash('sha256').update('').digest('hex');
    const signHeaders = Object.keys(headers);
    const signHeaderStr = Object.keys(signHeaders).reduce((pre, cur, idx) => {
      return `${pre}${cur}:${headers[cur]}${idx === signHeaders.length - 1 ? '' : '\n'}`;
    }, '');
    const stringToSign = [method, contentHash, signHeaderStr, signUrl].join('\n');
    const signStr = this.accessKey + t + nonce + stringToSign;
    return {
      sign: this.sign(signStr, this.secretKey),
      signHeaders: signHeaders.join(':'),
    };
  }

  /**
   * ??????????????????(?????????????????????)
   *
   * @param {string} t ?????????????????????
   * @returns {string} token ?????????
   */
  async requestSign(t: string): Promise<string> {
    let accessToken = await this.store.getAccessToken();
    if (!accessToken) {
      await this.init(); // ???????????? accessToke ???, ???????????????
      accessToken = await this.store.getAccessToken();
    }
    const str = `${this.accessKey}${accessToken}${t}`;
    return this.sign(str, this.secretKey);
  }

  async requestSignV2(t: string, headers: TuyaOpenApiClientRequestHeaderBase, body: TuyaOpenApiClientRequestBodyBase): Promise<{ sign: string, signHeaders: string }> {
    let accessToken = await this.store.getAccessToken();
    if (!accessToken) {
      await this.init(); // ???????????? accessToke ???, ???????????????
      accessToken = await this.store.getAccessToken();
    }
    // ????????????
    const nonce = '';
    const method = 'GET';
    const signUrl = '/v1.0/token?grant_type=1';
    const bodyStr = JSON.stringify(body);
    const contentHash = crypto.createHash('sha256').update(bodyStr).digest('hex');
    const signHeaders = Object.keys(headers);
    const signHeaderStr = Object.keys(signHeaders).reduce((pre, cur, idx) => {
      return `${pre}${cur}:${headers[cur]}${idx === signHeaders.length - 1 ? '' : '\n'}`;
    }, '');
    const stringToSign = [method, contentHash, signHeaderStr, signUrl].join('\n');
    const signStr = this.accessKey + accessToken + t + nonce + stringToSign;
    return {
      sign: this.sign(signStr, this.secretKey),
      signHeaders: signHeaders.join(':'),
    };
  }

  sign(str: string, secret: string): string {
    return crypto
      .createHmac('sha256', secret)
      .update(str, 'utf8')
      .digest('hex')
      .toUpperCase();
  }

  /**
   * ?????????????????? headers
   *
   * @param {string} t
   * @param {boolean} forRefresh
   */
  async getHeader(t: string, forRefresh = false): Promise<TuyaOpenApiClientRequestExtHeader> {
    const sign = forRefresh ? this.refreshSign(t) : await this.requestSign(t);
    const accessToken = await this.store.getAccessToken();
    return {
      t,
      sign,
      client_id: this.accessKey,
      sign_method: "HMAC-SHA256",
      access_token: accessToken || '',
      Dev_lang: 'Nodejs',
      Dev_channel: 'SaaSFramework',
  };
  }

  async getHeaderV2(t: string, forRefresh = false, headers: TuyaOpenApiClientRequestHeaderBase, body: TuyaOpenApiClientRequestBodyBase): Promise<TuyaOpenApiClientRequestExtHeader> {
    const { sign, signHeaders } = forRefresh ? await this.refreshSignV2(t, headers) : await this.requestSignV2(t, headers, body);
    const accessToken = await this.store.getAccessToken();
    return {
      t,
      sign,
      client_id: this.accessKey,
      sign_method: "HMAC-SHA256",
      access_token: accessToken || '',
      Dev_lang: 'Nodejs',
      Dev_channel: 'SaaSFramework',
      'Signature-Headers': signHeaders,
    };
  }

}

export default TuyaOpenApiClient;
export {
  TuyaOpenApiClientOptions,
  TuyaOpenApiClient,
};
