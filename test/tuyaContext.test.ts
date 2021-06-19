import { TuyaContext } from '../src/tuyaContext';
import Axios from 'axios';
import Mock from 'axios-mock-adapter';
import { TuyaResponseRefreshToken} from '../src/interfaces';

const axios = Axios.create();
const axiosMock = new Mock(axios);


const ctxOpt = {
    accessKey: 'this-is-mock-accessKey',
    secretKey: 'this-is-mock-secretKey',
    baseUrl: 'https://openapi.tuya.com',
    rpc: axios,
};

const ctx = new TuyaContext(ctxOpt);

beforeAll(async () => {
  axiosMock.onGet(`${ctxOpt.baseUrl}/v1.0/token?grant_type=1`).reply(200, {
    result: {
      access_token: 'c5b8e7f847d1382d242e90a93be291cc',
      expire_time: 3060,
      refresh_token: '7245ecbc34f0fc8344e2495291342145',
      uid: 'sh1548057511982g5FNI'
    },
    success: true,
    t: 1615272320570
  });
  axiosMock.onGet(`${ctxOpt.baseUrl}/v1.0/token/7245ecbc34f0fc8344e2495291342145`).reply(200, {
    result: {
      access_token: 'c5b8e7f847d1382d242e90a93be291cc',
      expire_time: 3060,
      refresh_token: '7245ecbc34f0fc8344e2495291342145',
      uid: 'sh1548057511982g5FNI'
    },
    success: true,
    t: 1615272320570
  });
});

test('expect TuyaContext', async () => {
  expect(ctx).toBeDefined();

});


test('expect TuyaContext request success', async () => {
  const res = await ctx.request<TuyaResponseRefreshToken>({
    path: '/v1.0/token/7245ecbc34f0fc8344e2495291342145',
    method: 'GET',
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
  expect(res.result).toBeDefined();
  expect(res.result.access_token).toBeDefined();

});


