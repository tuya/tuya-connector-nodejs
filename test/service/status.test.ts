import { TuyaContext } from '../../src/tuyaContext';
import { axios } from '../utils/axiosMock';


const ctxOpt = {
    accessKey: 'this-is-mock-accessKey',
    secretKey: 'this-is-mock-secretKey',
    baseUrl: 'https://openapi.tuya.com',
    rpc: axios,
};

const ctx = new TuyaContext(ctxOpt);

test('expect deviceStatus services defined', async () => {
  expect(ctx.deviceStatus).toBeDefined();
});

test('expect deviceStatus status success', async () => {
  const res = await ctx.deviceStatus.status({
    device_id: 'mock-id',
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});
test('expect deviceStatus status list success', async () => {
  const res = await ctx.deviceStatus.statusList({
    device_ids: ['mock-id']
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});
