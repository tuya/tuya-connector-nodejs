[English](README.md) | [中文版](README_CN.md)

### What is `tuya-connector`?

[Tuya Open Platform—API User Guide](https://developer.tuya.com/en/docs/iot/api-reference?id=Ka7qb7vhber64)

Tuya provides a set of HTTP APIs and signature verification logic. You need to implement the logic when you integrate the APIs.

`tuya-connector` provides capabilities to sign a request, refresh, store, and renew a token, and encapsulate common APIs. You can quickly connect to Tuya open platform.

### Installation

```bash
npm install @tuya/tuya-connector-nodejs

# or
yarn add @tuya/tuya-connector-nodejs
```

### Get started

```ts
import { TuyaContext  } from '@tuya/tuya-connector-nodejs';

const tuya = new TuyaContext({
  baseUrl: 'https://openapi.tuyacn.com',
  accessKey: 'xx',
  secretKey: 'xx',
});

const device = await tuya.device.detail({
  device_id: 'device_id'
});
```

## Advanced development

### Custom `tokenStore`

By default, `tokenStore` is implemented based on memory. We recommend that you implement the store instance in your service. In the following code block, the Redis Store is used as an example.

```ts
// tokenStore.ts
import { TuyaTokenStorInterface, TuyaTokensSave } from '@tuya/tuya-connector-nodejs';
import IORedis from 'ioredis';

export class RedisTokenStore implements TuyaTokenStorInterface {
  private readonly client: IORedis.Redis;
  private readonly key: string;
  constructor(client: IORedis.Redis, key: string = 'tuya::token') {
    this.client = client;
    this.key = key;
  }

    async setTokens(tokens: TuyaTokensSave): Promise<boolean> {
    const res = await this.client.set(this.key, JSON.stringify(tokens));
    return ! ! res;
  }
  async getAccessToken(): Promise<string | undefined> {
    const jsonStr = await this.client.get(this.key) || '{}';
    const tokens: TuyaTokensSave = JSON.parse(jsonStr);
    return tokens && tokens.access_token;
  }
  async getRefreshToken(): Promise<string | undefined> {
    const jsonStr = await this.client.get(this.key) || '{}';
    const tokens: TuyaTokensSave = JSON.parse(jsonStr);
    return tokens.refresh_token;
  }
}

// index.ts
import { RedisTokenStore } from './tokenStore';
import IoRedis from 'ioredis';
const redis = new IoRedis();

const tuya = new TuyaContext({
  baseUrl: 'https://openapi.tuyacn.com',
  accessKey: 'xx',
  secretKey: 'xx',
  store: new RedisTokenStore(redis),
});
```

### Custom request of `httpClient`

`tuya-connector` uses Axios as `httpClient` by default, and exposes replaceable parameters. If necessary, you can also customize `httpClient`.

```ts
import axios from 'axios';
import { TuyaContext  } from '@tuya/tuya-connector-nodejs';

const tuya = new TuyaContext({
  baseUrl: 'https://openapi.tuyacn.com',
  accessKey: 'xx',
  secretKey: 'xx',
  rpc: axios
});
```

### Request of other OpenAPIs

`tuya-connector` encapsulates common APIs, and declares the types of reqeust and response parameters. You can customize additional API requests.

```ts
import { TuyaContext  } from '@tuya/tuya-connector-nodejs';

const tuya = new TuyaContext({
  baseUrl: 'https://openapi.tuyacn.com',
  accessKey: 'xx',
  secretKey: 'xx',
});

const { data } = await tuya.request({
  method: 'GET',
  path: '/v1.0/xx',
  body: {},
});
```

### Other issues

1. Apply for authorization key. On the [Cloud Development Platform](https://iot.tuya.com/cloud/), you can create a project to get the access ID and access secret of the cloud application.

2. Global error codes. For more information, see [Global Error Codes](https://developer.tuya.com/en/docs/iot/error-code?id=K989ruxx88swc).
