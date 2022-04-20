import { TuyaOpenApiClient } from '../../core/client';
import { TuyaResponse } from '../../interfaces';

interface DeviceServiceDetailParam {
  device_id: string;
}

interface DeviceServiceDetailResult {
  id: string;
  gateway_id: string;
  node_id: string;
  uuid: string;
  category: string;
  category_name: string;
  name: string;
  product_id: string;
  product_name: string;
  local_key: string;
  sub: boolean;
  asset_id: string;
  owner_id: string;
  ip: string;
  lon: string;
  lat: string;
  model: string;
  time_zone: string;
  active_time: number;
  update_time: number;
  create_time: number;
  online: boolean;
  icon: string;
}

interface DeviceServiceListParam {
  source_type?: string;
  source_id?: string;
  device_ids?: string[];
  name?: string;
  category?: string;
  product_id?: string;
  last_row_key?: string;
  page_size?: number;
}

interface DeviceServiceListResult {
  has_more: boolean;
  list: DeviceServiceDetailResult[];
  last_row_key: string;
  total: number;
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
  last_row_key?: string;
  page_size?: number;
}

interface DeviceServiceAssetDevicesResult {
  list: {
    device_id: string;
    asset_id: string;
    asset_name: string;
  }[];
  last_row_key: string;
  total_size: number;
  page_size: number;
  has_next: boolean;
}

class TuyaOpenApiDeviceService {
  private client: TuyaOpenApiClient;

  constructor(client: TuyaOpenApiClient) {
    this.client = client;
  }

  async detail(param: DeviceServiceDetailParam): Promise<TuyaResponse<DeviceServiceDetailResult>> {
    const res = await this.client.request<DeviceServiceDetailResult>({
      path: `/v1.1/iot-03/devices/${param.device_id}`,
      method: 'GET',
    });
    return res.data;
  }

  async list(param?: DeviceServiceListParam): Promise<TuyaResponse<DeviceServiceListResult>> {
    const res = await this.client.request<DeviceServiceListResult>({
      path: `/v1.2/iot-03/devices`,
      method: 'GET',
      query: {
        ...param,
        device_ids: param?.device_ids?.join(',')
      },
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
      path: `/v1.0/iot-02/assets/${param.asset_id}/devices`,
      method: 'GET',
      query: {
        last_row_key: param.last_row_key,
        page_size: param.page_size
      }
    });
    return res.data;
  }
}

export {
  TuyaOpenApiDeviceService,
  DeviceServiceDetailParam,
  DeviceServiceDetailResult,
  DeviceServiceListParam,
  DeviceServiceListResult,
  DeviceServiceResetParam,
  DeviceServiceDeleteParam,
  DeviceServiceDeleteBatchParam,
  DeviceServiceSubDeviceParam,
  DeviceServiceSubDeviceResult,
  DeviceServiceChangeNameParam,
  DeviceServiceFreezeStateParam,
  DeviceServiceFreezeStateResult,
  DeviceServiceChangeFreezeStateParam,
  DeviceServiceAssetDevicesParam,
  DeviceServiceAssetDevicesResult,
};
export default TuyaOpenApiDeviceService;
