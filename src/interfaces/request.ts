/**
 * TuyaRequestExtHeader.
 *
 * 涂鸦请求时的特定鉴权 header
 */
export interface TuyaRequestExtHeader {
  client_id: string;
  t: string;
  sign_method: 'HMAC-SHA256';
  sign: string;
}

/**
 * TuyaResponseCode.
 * 
 * 涂鸦 OpenApi 请求响应状态码, 参考以下链接查看说明
 * https://developer.tuya.com/cn/docs/iot/open-api/api-reference/error-code/error-code?id=K989ruxx88swc
 */
export type TuyaResponseCode = 
  500 | // 系统错误，请联系管理员 
  1000 | // 
  1001 |
  1002 |
  1003 |
  1004 |
  1005 | 
  1006 |
  1007 |
  1010 |
  1011 |
  1012 |
  1013 |
  1100 |
  1101 |
  1102 |
  1103 |
  1104 |
  1105 |
  1106 |
  1107 |
  2001 |
  2002 |
  2003 |
  2004 |
  2005 |
  2006 |
  2007 |
  2008 |
  2009 |
  2010 |
  2012 |
  2013 |
  2014 |
  2015;

/**
 * TuyaResponse.
 *
 * 涂鸦响应类型包装
 */
export interface TuyaResponse <T> {
  code: TuyaResponseCode;
  success: boolean;
  msg?: null | string;
  result: T;
}
export type PromiseResult<T> = Promise<TuyaResponse<T>>;


export interface TuyaResponseGetToken {
  uid: string;
  access_token: string;
  refresh_token: string;
  expire_time: number;
}

export interface TuyaResponseRefreshToken {
  uid: string;
  access_token: string;
  refresh_token: string;
  expire_time: number;
}

export interface TuyaResponseUserTicket {
  ticket: string;
  expire_time: number;
}
