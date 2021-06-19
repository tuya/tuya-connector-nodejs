import { TuyaContext } from '../src';
// const { TuyaContext } = require('../lib/index');

const list = [
    'https://openapi.tuyacn.com', // 国区
    'https://openapi.tuyaus.com', // 美区
    'https://openapi.tuyaeu.com', // 欧洲
    'https://openapi.tuyain.com', // 印度
];

const context = new TuyaContext({
  baseUrl: 'https://openapi.tuyacn.com',   // 国区
  accessKey: 'xxx',
  secretKey: 'xxx',
});

const main = async () => {
  // await context.client.init();

  const page_size = 100;
  let last_row_key = "";
  const res  = await context.assets.childAssets({
    asset_id: '-1',
    page_size,
    last_row_key,
  });
  if(!res.success) {
    new Error();
  }
  console.log(res);
};

main().catch(err => {
  console.log(err);
});
