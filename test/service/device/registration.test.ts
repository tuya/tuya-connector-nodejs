import { TuyaContext } from '../../../src/tuyaContext';
import { axios } from '../../utils/axiosMock';


const ctxOpt = {
    accessKey: 'this-is-mock-accessKey',
    secretKey: 'this-is-mock-secretKey',
    baseUrl: 'https://openapi.tuya.com',
    rpc: axios,
};

const ctx = new TuyaContext(ctxOpt);

test('expect device deviceRegistration defined', async () => {
  expect(ctx.deviceRegistration).toBeDefined();
});

test('expect device create token success', async () => {
  const res = await ctx.deviceRegistration.createToken({
    pairing_type: 'ble',
    uid: 'mock-uid',
    time_zone_id: '8',
    asset_id: 'mock-asset-id',
    extension: {
      uuid: 'mock-uid',
    }
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device token success', async () => {
  const res = await ctx.deviceRegistration.token({
    token: 'mock-token'

  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device discover success', async () => {
  const res = await ctx.deviceRegistration.discover({
    device_id: 'mock-id',
    duration: 60,
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device stop discover success', async () => {
  const res = await ctx.deviceRegistration.stopDiscover({
    device_id: 'mock-id',
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect device subdevice success', async () => {
  const res = await ctx.deviceRegistration.subDevice({
    device_id: 'mock-id',
    discovery_time: 60.
  });

  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});
