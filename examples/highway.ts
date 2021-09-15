import * as qs from 'qs';
import * as crypto from 'crypto';
import { default as axios } from 'axios';


let accessToken = '';
const config = {
  host: '',
  accessKey: '',
  secretKey: '',
};

// httpClient Instance
const httpClient = axios.create({
  baseURL: config.host,
  timeout: 5 * 1e3,
});

// Request Interceptor: 禁止 GET 请求自动 encode query 参数


// Response Interceptor


async function main() {

  // 1. 登陆签名、请求 highway 获取登陆 token
  const tokenHeaders: { [k: string]: string } = await getTokenSign();
  const options = {
    headers: tokenHeaders,
  };
  const { data: login } = await httpClient.get('/v1.0/token?grant_type=1', options);
  if (!login || !login.success) {
    throw Error(`获取highway授权失败: ${login.msg}`);
  }
  console.log('highway 登陆凭证获取成功: ', login.result.access_token);
  // 2. TODO 保存登陆凭证
  accessToken = login.result.access_token;
  // 3. 接口签名、使用 token 请求 highway 其他接口
  const url = '/v1.0/iot-02/assets/-1/sub-assets?test1=1';
  const method = 'GET';
  const query = {
    page_size: 100,
    last_row_key: '',
    test1: '1',
    test2: '支持中文',
    test3: [{name:'support array'}]
  };
  const reqHeaders: { [k: string]: string } = await getRequestSign(url, method, {}, query);
  const { path, ...headers } = reqHeaders;
  console.log('请求头: ', reqHeaders)

  const { data } = await httpClient.request({
    url: path, // highway 建议数组解析为 x1,x2,x3 格式
    method,
    data: {},
    params: {},
    headers,
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
    Dev_channel: 'SaaSFramework',
    Dev_lang: 'Nodejs'
  };
}

// request 签名，作为 headers 传递即可
async function getRequestSign(path: string, method: string, headers: { [k: string]: string } = {}, query: { [k: string]: any } = {}, body: { [k: string]: any } = {}) {
  const t = Date.now().toString();
  // 参数去重: querystring 参数优先级高于 query
  const [uri, pathQuery] = path.split('?');
  console.log(uri, pathQuery);
  const queryMerged = Object.assign(query, qs.parse(pathQuery));
  // query 字典排序，后续有 form 相关 highway 接口也要加入
  const sortedQuery: { [k: string]: string } = {};
  Object.keys(queryMerged).sort().forEach(i => sortedQuery[i] = query[i]);
  console.log('sortedQuery', sortedQuery);
  // highway 会将 GET Array 参数当成 String 处理
  // qs 序列化时会自动 encode
  // querystring 解析数组有问题，qs 会转成 string 处理(规范未定)
  // qs 和 querystring 都会忽略空数组，序列化失败都会返回空字符串
  const querystring = qs.stringify(sortedQuery);
  const url = querystring ? `${uri}?${querystring}` : uri;
  console.log('请求地址: ', url);
  if(!accessToken) {
    // 没有 token 本应该重新去请求，这里图方便直接丢全局对象去，不可能没有 token
  }
  const contentHash = crypto.createHash('sha256').update(JSON.stringify(body)).digest('hex');
  const stringToSign = [method, contentHash, '', decodeURIComponent(url)].join('\n');
  const signStr = config.accessKey + accessToken + t + stringToSign;
  return {
    t,
    path: url,
    access_token: accessToken,
    sign_method: 'HMAC-SHA256',
    client_id: config.accessKey,
    sign: await encryptStr(signStr, config.secretKey),
    Dev_channel: 'SaaSFramework',
    Dev_lang: 'Nodejs'
  };
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
