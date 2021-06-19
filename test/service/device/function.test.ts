import { TuyaContext } from '../../../src/tuyaContext';
import { axios } from '../../utils/axiosMock';


const ctxOpt = {
    accessKey: 'this-is-mock-accessKey',
    secretKey: 'this-is-mock-secretKey',
    baseUrl: 'https://openapi.tuya.com',
    rpc: axios,
};

const ctx = new TuyaContext(ctxOpt);

test('expect device deviceFunction defined', async () => {
  expect(ctx.deviceFunction).toBeDefined();
});

test('expect device categories success', async () => {
  const res = await ctx.deviceFunction.categories({
    category: 'kg',
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device devices success', async () => {
  const res = await ctx.deviceFunction.devices({
    device_id: 'mock-id',
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device specification success', async () => {
  const res = await ctx.deviceFunction.specification({
    device_id: 'mock-id',
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device command success', async () => {
  const res = await ctx.deviceFunction.command({
    device_id: 'mock-id',
    commands: [{
      "code":"switch_led",
      "value":true
    },
    {
      "code":"bright",
      "value":30
    }]
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});


