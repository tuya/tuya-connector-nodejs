import { TuyaContext } from '../../src/tuyaContext';
import { axios } from '../utils/axiosMock';


const ctxOpt = {
    accessKey: 'this-is-mock-accessKey',
    secretKey: 'this-is-mock-secretKey',
    baseUrl: 'https://openapi.tuya.com',
    rpc: axios,
};

const ctx = new TuyaContext(ctxOpt);

test('expect deviceLogs services defined', async () => {
  expect(ctx.deviceLogs).toBeDefined();
});

test('expect deviceLogs logs success', async () => {
  const res = await ctx.deviceLogs.logs({
    device_id: 'mock-id',
    event_types: '1,2',
    start_time: Date.now() - 24 * 60 * 60 * 1e3,
    end_time: Date.now(),
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect deviceLogs report success', async () => {
  const res = await ctx.deviceLogs.report({
    device_id: 'mock-id',
    start_time: Date.now() - 24 * 60 * 60 * 1e3,
    end_time: Date.now(),
    codes: ['mock-1'],
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});
