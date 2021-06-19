import { TuyaOpenApiClient } from '../../core/client';
import { TuyaResponse } from '../../interfaces';

interface DeviceServiceDetailParam {
  device_id: string;
}

interface DeviceServiceDetailResult {
  id: string;
  name: string;
  uid: string;
  local_key: string;
  category: string;
  product_id: string;
  product_name: string;
  sub: boolean;
  uuid: string;
  asset_id: string;
  online: boolean;
  active_time: number;
  icon: string;
  ip: string;
}

interface DeviceServiceListParam {
  device_ids?: string[];
}

interface DeviceServiceListResult {
  total: number;
  has_more: boolean;
  devices: {
    id: string;
    uid: string;
    local_key: string;
    category: string;
    product_id: string;
    sub: boolean;
    uuid: string;
    asset_id: string;
    online: boolean;
    name: string;
    ip: string;
    time_zone: string;
    create_time: number;
    update_time: number;
    active_time: number;
  }[];
}

interface DeviceServiceResetParam {
  device_id: string;
}

interface DeviceServiceDeleteParam {
  device_id: string;
}

interface DeviceServiceDeleteBatchParam {
  device_ids: string[];
}

interface DeviceServiceSubDeviceParam {
  device_id: string;
}

interface DeviceServiceSubDeviceResult {
  id: string;
  name: string;
  online: boolean;
  asset_id: string;
  category: string;
  produce_id: string;
  active_time: number;
  update_time: number;
}

interface DeviceServiceChangeNameParam {
  device_id: string;
  name: string;
}

interface DeviceServiceFreezeStateParam {
  device_id: string;
}
interface DeviceServiceFreezeStateResult {
  state: 0 | 1;
}


interface DeviceServiceChangeFreezeStateParam {
  device_id: string;
  state: 0 | 1;
}

interface DeviceServiceAssetDevicesParam {
  asset_id: string;
}
interface DeviceServiceAssetDevicesResult {
  id: string;
}

class TuyaOpenApiDeviceService {
  private client: TuyaOpenApiClient;

  constructor(client: TuyaOpenApiClient) {
    this.client = client;
  }

  async detail(param: DeviceServiceDetailParam): Promise<TuyaResponse<DeviceServiceDetailResult>> {
    const res = await this.client.request<DeviceServiceDetailResult>({
      path: `/v1.0/iot-03/devices/${param.device_id}`,
      method: 'GET',
    });
    return res.data;
  }

  async list(param?: DeviceServiceListParam): Promise<TuyaResponse<DeviceServiceListResult>> {
    const res = await this.client.request<DeviceServiceListResult>({
      path: `/v1.0/iot-03/devices`,
      method: 'GET',
      query: param,
    });
    return res.data;
  }

  async reset(param: DeviceServiceResetParam): Promise<TuyaResponse<boolean>> {
    const res = await this.client.request<boolean>({
      path: `/v1.0/iot-03/devices/${param.device_id}/actions/reset`,
      method: 'POST',
    });
    return res.data;
  }

  async delete(param: DeviceServiceDeleteParam): Promise<TuyaResponse<boolean>> {
    const res = await this.client.request<boolean>({
      path: `/v1.0/iot-03/devices/${param.device_id}`,
      method: 'DELETE',
    });
    return res.data;
  }

  async deleteBatch(param: DeviceServiceDeleteBatchParam): Promise<TuyaResponse<boolean>> {

    const res = await this.client.request<boolean>({
      path: `/v1.0/iot-03/devices/`,
      method: 'DELETE',
      query: param,
    });
    return res.data;
  }

  async subDevice(param: DeviceServiceSubDeviceParam): Promise<TuyaResponse<DeviceServiceSubDeviceResult[]>> {

    const res = await this.client.request<DeviceServiceSubDeviceResult[]>({
      path: `/v1.0/iot-03/devices/${param.device_id}/sub-devices`,
      method: 'GET',
      query: param,
    });
    return res.data;
  }

  async changeName(param: DeviceServiceChangeNameParam): Promise<TuyaResponse<boolean>> {

    const res = await this.client.request<boolean>({
      path: `/v1.0/iot-03/devices/${param.device_id}`,
      method: 'PUT',
      body: {
        name: param.name
      },
    });
    return res.data;
  }

  async freezeState(param: DeviceServiceFreezeStateParam): Promise<TuyaResponse<DeviceServiceFreezeStateResult>> {

    const res = await this.client.request<DeviceServiceFreezeStateResult>({
      path: `/v1.0/iot-03/devices/${param.device_id}/freeze-state`,
      method: 'GET',
    });
    return res.data;
  }

  async changeFreezeState(param: DeviceServiceChangeFreezeStateParam): Promise<TuyaResponse<boolean>> {

    const res = await this.client.request<boolean>({
      path: `/v1.0/iot-03/devices/${param.device_id}/freeze-state`,
      method: 'PUT',
      body: {
        state: param.state,
      }
    });
    return res.data;
  }

  async assetDevices(param: DeviceServiceAssetDevicesParam): Promise<TuyaResponse<DeviceServiceAssetDevicesResult[]>> {

    const res = await this.client.request<DeviceServiceAssetDevicesResult[]>({
      path: `/v1.0/iot-03/assets/${param.asset_id}/devices`,
      method: 'GET',
    });
    return res.data;
  }
}

export {
  TuyaOpenApiDeviceService
}
export default TuyaOpenApiDeviceService;
