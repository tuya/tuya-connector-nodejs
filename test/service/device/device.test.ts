import { TuyaContext } from '../../../src/tuyaContext';
import { axios } from '../../utils/axiosMock';


const ctxOpt = {
    accessKey: 'this-is-mock-accessKey',
    secretKey: 'this-is-mock-secretKey',
    baseUrl: 'https://openapi.tuya.com',
    rpc: axios,
};

const ctx = new TuyaContext(ctxOpt);

test('expect device services defined', async () => {
  expect(ctx.device).toBeDefined();
});

test('expect device detail success', async () => {
  const res = await ctx.device.detail({
    device_id: 'mock-id',
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device list success', async () => {
  const res = await ctx.device.list({
    device_ids: ['mock-id'],
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device reset success', async () => {
  const res = await ctx.device.reset({
    device_id: 'mock-id',
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device delete success', async () => {
  const res = await ctx.device.delete({
    device_id: 'mock-id',
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device deleteBatch success', async () => {
  const res = await ctx.device.deleteBatch({
    device_ids: ['mock-id'],
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device subDevice success', async () => {
  const res = await ctx.device.subDevice({
    device_id: 'mock-id',
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device changeName success', async () => {
  const res = await ctx.device.changeName({
    device_id: 'mock-id',
    name: 'mock-name',
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device freezeState success', async () => {
  const res = await ctx.device.freezeState({
    device_id: 'mock-id',
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device changeFreezeState success', async () => {
  const res = await ctx.device.changeFreezeState({
    device_id: 'mock-id',
    state: 1,
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device assetDevices success', async () => {
  const res = await ctx.device.assetDevices({
    asset_id: 'mock-id',
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});













