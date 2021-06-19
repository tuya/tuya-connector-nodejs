import { TuyaContext } from '../../src/tuyaContext';
import { axios } from '../utils/axiosMock';


const ctxOpt = {
    accessKey: 'this-is-mock-accessKey',
    secretKey: 'this-is-mock-secretKey',
    baseUrl: 'https://openapi.tuya.com',
    rpc: axios,
};

const ctx = new TuyaContext(ctxOpt);

test('expect user services defined', async () => {
  expect(ctx.user).toBeDefined();
});

test('expect user get success', async () => {
  const res = await ctx.user.getUser({
    user_id: 'mock-id',
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});


test('expect user register success', async () => {
  const res = await ctx.user.registerUser({
    username: 'mock-name',
    password: 'moc-password',
    country_code: 'AY'
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect user delete success', async () => {
  const res = await ctx.user.deleteUser({
    user_id: 'mock-id'
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect user changePassword success', async () => {
  const res = await ctx.user.changePassword({
    user_id: 'mock-id',
    old_password: 'mock-old-password',
    new_password: 'mock-new-password',
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});

test('expect user list success', async () => {
  const res = await ctx.user.users({
    last_row_key: '',
    page_size: 20,
  });
  expect(res).toBeDefined();
  expect(res.success).toBe(true);
});



