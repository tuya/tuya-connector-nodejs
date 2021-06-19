import { TuyaContext } from '../../src/tuyaContext';
import { axios } from '../utils/axiosMock';


const ctxOpt = {
    accessKey: 'this-is-mock-accessKey',
    secretKey: 'this-is-mock-secretKey',
    baseUrl: 'https://openapi.tuya.com',
    rpc: axios,
};

const ctx = new TuyaContext(ctxOpt);

test('expect assets services defined', async () => {
  expect(ctx.assets).toBeDefined();
});

test('expect assets get success', async () => {
  const res = await ctx.assets.get({
    assetId: 'mock-id'
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});
test('expect assets list success', async () => {
  const res = await ctx.assets.assets({
    assetId: ['mock-id-1', 'mock-id-2', 'mock-id-3'],
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect assets sub assets', async () => {
  const res = await ctx.assets.childAssets({
    asset_id: 'mock-id',
    page_size: 10,
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});
test('expect assets sub device', async () => {
  const res = await ctx.assets.devices({
    asset_id: 'mock-id',
    page_size: 10,
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect assets add', async () => {
  const res = await ctx.assets.add({
    name: 'mock-name',
    meta_id: 'mock-id',
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect assets update', async () => {
  const res = await ctx.assets.update({
    asset_id: 'mock-id',
    name: 'mock-name',
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect assets delete', async () => {
  const res = await ctx.assets.delete({
    asset_id: 'mock-id',
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});
