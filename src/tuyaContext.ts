import { TuyaOpenApiClient, TuyaOpenApiClientRequestOptions } from './core';
import {  TuyaContextOptions, TuyaResponse } from './interfaces';
import {
  TuyaOpenApiUserService,
  TuyaOpenApiAssetsService,
  TuyaOpenApiDeviceService,
  TuyaOpenApiDeviceFunctionService,
  TuyaOpenApiDeviceRegistrationService,
  TuyaOpenApiDeviceLogService,
  TuyaOpenApiDeviceStatusService,
} from './service';

export class TuyaContext {
  readonly client: TuyaOpenApiClient;
  readonly user: TuyaOpenApiUserService;
  readonly assets: TuyaOpenApiAssetsService;
  readonly device: TuyaOpenApiDeviceService;
  readonly deviceFunction: TuyaOpenApiDeviceFunctionService;
  readonly deviceLogs: TuyaOpenApiDeviceLogService;
  readonly deviceRegistration: TuyaOpenApiDeviceRegistrationService;
  readonly deviceStatus: TuyaOpenApiDeviceStatusService;


  constructor(opt: TuyaContextOptions) {
    this.client = new TuyaOpenApiClient(opt);
    this.user = new TuyaOpenApiUserService(this.client);
    this.assets = new TuyaOpenApiAssetsService(this.client);
    this.device = new TuyaOpenApiDeviceService(this.client);
    this.deviceFunction = new TuyaOpenApiDeviceFunctionService(this.client);
    this.deviceLogs = new TuyaOpenApiDeviceLogService(this.client);
    this.deviceRegistration = new TuyaOpenApiDeviceRegistrationService(this.client);
    this.deviceStatus = new TuyaOpenApiDeviceStatusService(this.client);
  }

  async request<T>(opt: TuyaOpenApiClientRequestOptions): Promise<TuyaResponse<T>> {
    const res = await this.client.request<T>(opt);
    return res.data;
  }
}
