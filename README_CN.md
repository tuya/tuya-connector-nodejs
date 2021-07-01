[English](README.md) | [中文版](README_CN.md)

### tuya-connector 是什么?

[涂鸦智能IOT开放平台 - API开发文档](https://developer.tuya.com/cn/docs/iot/api-reference?id=Ka7qb7vhber64) 

涂鸦开放平台提供了一套 http 接口, 同时有相应的签名校验逻辑, 接入时需要自行实现相应逻辑。

tuya-connector 提供了请求签名, token 刷新、存储、续期, 常用接口封装等能力, 方便您快速接入涂鸦开放平台。

### 安装

```bash
npm install @tuya/tuya-connector-nodejs

# or
yarn add @tuya/tuya-connector-nodejs
```

### 开始

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

## 进阶

### 自定义 tokenStore

默认的 token store 是基于内存的, 使用过程中, 建议业务方自己实现相应的 store 实例, 下面以 redis 存储作为示例

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
    return !!res;
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

### 自定义请求 httpClient 

tuya-connector 默认使用 axios 作为 httpClient, 同时暴露出可替换的参数, 如有需要也可自定义 httpClient:

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

### 请求其他 openApi 接口

tuya-connector 提供了一些常用的接口封装, 声明了对应的入参和出参类型, 对于未覆盖的 Api, 可自定义请求

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

### 其他问题

1. ak、sk 申请: `https://iot.tuya.com/cloud` 创建项目可获取云应用的 ak & sk 授权密钥

2. 全局错误码: `https://developer.tuya.com/cn/docs/iot/error-code?id=K989ruxx88swc`
