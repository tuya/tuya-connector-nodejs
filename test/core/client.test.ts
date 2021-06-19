import { TuyaOpenApiClient } from '../../src/core/client';
import Axios from 'axios';
import Mock from 'axios-mock-adapter';

const axios = Axios.create();
const axiosMock = new Mock(axios);



const ctxOpt = {
    accessKey: 'this-is-mock-accessKey',
    secretKey: 'this-is-mock-secretKey',
    baseUrl: 'https://openapi.tuya.com',
    rpc: axios,
};

const ctx = new TuyaOpenApiClient(ctxOpt);

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
  // await ctx.init();
});

test('expect TuyaContext init success', async () => {

  expect(ctx).toBeDefined();
  const tokens = await ctx.init();
  expect(tokens).toBeDefined();
  expect(tokens).toHaveProperty('success');
  expect(tokens.success).toBeTruthy();
  expect(tokens.result).toBeDefined();
  expect(tokens.result.access_token).toBeDefined();
  expect(tokens.result.refresh_token).toBeDefined();
  expect(tokens.result.uid).toBeDefined();
  expect(tokens.result.expire_time).toBeDefined();

});


test('expect TuyaContext refresh success', async () => {

  expect(ctx).toBeDefined();
  const tokens = await ctx.refreshToken();
  expect(tokens).toBeDefined();
  expect(tokens).toHaveProperty('success');
  expect(tokens.success).toBeTruthy();
  expect(tokens.result).toBeDefined();
  expect(tokens.result.access_token).toBeDefined();
  expect(tokens.result.refresh_token).toBeDefined();
  expect(tokens.result.uid).toBeDefined();
  expect(tokens.result.expire_time).toBeDefined();

});

test('expect TuyaContext sign success', async () => {

  const t = '1615274964146';
  const sign = await ctx.requestSign(t);
  expect(sign).toBe('625F3177068C99E176760A64D598D0D6066798B19C2C5C374A424D4CE7E277FA');

});
