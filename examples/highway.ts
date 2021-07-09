import axios from 'axios';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import querystring from "querystring";

let accessToken = '';
const config = {
  host: 'https://openapi-cn.wgine.com',
  accessKey: '4h4rn3qhag3rz8y5ruiq',
  secretKey: '5e0717c75e7e47bf963c123308859d64',
};

// httpClient Instance
const httpClient = axios.create({
  baseURL: config.host,
  timeout: 5 * 1e3,
});

// Request Interceptor


// Response Interceptor


async function main() {

  // 1. A签名、请求 highway 获取登陆 token
  const tokenHeaders: { [k: string]: string } = await getTokenSign();
  const options = {
    headers: tokenHeaders,
  };
  const { data: login } = await httpClient.get('/v1.0/token?grant_type=1', options);
  if (!login || !login.success) {
    throw Error(`获取highway授权失败: ${login.msg}`);
  }
  console.log('highway 登陆凭证获取成功', JSON.stringify(login));
  // 2. 保存登陆凭证
  accessToken = login.result.access_token;
  // 3. B签名、使用 token 请求 highway 其他接口
  const url = '/v1.0/iot-02/assets/-1/sub-assets';
  const method = 'GET';
  const query = {
    page_size: 100,
    last_row_key: '',
  };
  const reqHeaders: { [k: string]: string } = await getRequestSign(url, method, {}, query);

  console.log(reqHeaders);
  const { data } = await httpClient.request({
    url,
    method,
    data: {},
    params: query,
    headers: reqHeaders,
  });
  if (!data || !data.success) {
    throw Error(`请求 highway 业务接口出错: ${data.msg}`);
  }
  console.log('业务数据获取成功: ', JSON.stringify(data));
  // 4. TODO token 刷新相关

}

// token 签名，作为 headers 传递即可
async function getTokenSign(): Promise<{ [k: string]: string }> {
  const nonce = '';
  const method = 'GET';
  const timestamp = Date.now().toString();
  const signUrl = '/v1.0/token?grant_type=1';
  const contentHash = crypto.createHash('sha256').update('').digest('hex');
  const signHeaders = Object.keys({});
  const signHeaderStr = Object.keys(signHeaders).reduce((pre, cur, idx) => {
    return `${pre}${cur}:${{}[cur]}${idx === signHeaders.length - 1 ? '' : '\n'}`;
  }, '');
  const stringToSign = [method, contentHash, signHeaderStr, signUrl].join('\n');
  const signStr = config.accessKey + timestamp + nonce + stringToSign;
  return {
    t: timestamp,
    sign_method: 'HMAC-SHA256',
    client_id: config.accessKey,
    sign: await encryptStr(signStr, config.secretKey),
  };
}

// request 签名，作为 headers 传递即可
async function getRequestSign(path: string, method: string, headers: { [k: string]: string } = {}, query: { [k: string]: any } = {}, body: { [k: string]: any } = {}) {
  const t = Date.now().toString();
  // query 字典排序，后续有 form 相关 highway 接口也要加入
  const sortedQuery: { [k: string]: string } = {};
  Object.keys(query).sort().forEach(i => sortedQuery[i] = query[i]);
  const qs = querystring.stringify(sortedQuery);
  const url = qs ? `${path}?${qs}` : path;
  if(!accessToken) {
    // 没有 token 本应该重新去请求，这里图方便直接丢全局对象去，不可能没有 token
  }
  const contentHash = crypto.createHash('sha256').update(JSON.stringify(body)).digest('hex');
  const stringToSign = [method, contentHash, '', decodeURIComponent(url)].join('\n');
  const signStr = config.accessKey + accessToken + t + stringToSign;
  return {
    t,
    sign_method: 'HMAC-SHA256',
    client_id: config.accessKey,
    sign: await encryptStr(signStr, config.secretKey),
    access_token: accessToken,
  };
}

// 生成随机字符串
async function uuid(): Promise<string> {
  return uuidv4().replace(/-/g, '');
}

// HMAC-SHA256 加密算法，返回纯大写字符
async function encryptStr(str: string, secret: string): Promise<string> {
  return crypto.createHmac('sha256', secret).update(str, 'utf8').digest('hex').toUpperCase();
}

main();


// 1. nonce 测试

// 2. 添加单元测试

// 3. 应该通过两个 axios 实例，请求拦截器实现较好

// 4. 表单方式请求 highway 接口未测试，可能存在问题
