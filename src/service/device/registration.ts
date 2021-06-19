import { TuyaOpenApiClient } from '../../core/client';
import { TuyaResponse } from '../../interfaces';

interface DeviceRegistrationTokenParam {
  pairing_type: 'ble' | 'ap' | 'ez';
  uid: string;
  time_zone_id: string;
  asset_id: string;
  extension?: {
    uuid: string; // ble 类型时需要传入
  };
}

interface DeviceRegistrationTokenResult {
  expire_time: number;
  region: 'AY' | 'EU' | 'US';
  token: string;
  secret: string;
  extension: {
    encrypt_key: string;
    random: string;
  }
}

interface DeviceRegistrationUseTokenParam {
  token: string;
}

interface DeviceRegistrationUseTokenResult {
  success_devices: {
    device_id: string;
    product_id: string;
    name: string;
    category: string;
  }[];
  error_devices: {
    device_id: string;
    code: string;
    msg: string;
    name: string;
  }[];
}

interface DeviceRegistrationDiscoverParam {
  device_id: string;
  duration: number; // 0-3600s, default 100s
}

interface DeviceRegistrationStopDiscoverParam {
  device_id: string;
}


interface DeviceRegistrationSubDeviceParam {
  device_id: string;
  discovery_time: number;
}
interface DeviceRegistrationSubDeviceResult {
  id: string;
  name: string;
  asset_id: string;
  active_time: number;
  update_time: number;
  category: string;
  product_id: string;
  online: boolean;
}

class TuyaOpenApiDeviceRegistrationService {
  private client: TuyaOpenApiClient;

  constructor(client: TuyaOpenApiClient) {
    this.client = client;
  }

  async createToken(param: DeviceRegistrationTokenParam): Promise<TuyaResponse<DeviceRegistrationTokenResult>> {
    const res = await this.client.request<DeviceRegistrationTokenResult>({
      path: `/v1.0/iot-03/device-registration/token`,
      method: 'POST',
      body: param,
    });
    return res.data;
  }
  async token(param: DeviceRegistrationUseTokenParam): Promise<TuyaResponse<DeviceRegistrationUseTokenResult>> {

    const res = await this.client.request<DeviceRegistrationUseTokenResult>({
      path: `/v1.0/iot-03/device-registration/tokens/${param.token}`,
      method: 'POST',
      body: param,
    });
    return res.data;
  }
  
  async discover(param: DeviceRegistrationDiscoverParam): Promise<TuyaResponse<boolean>> {

    const res = await this.client.request<boolean>({
      path: `/v1.0/iot-03/device-registration/devices/${param.device_id}/actions/discover`,
      method: 'POST',
      body: param,
    });
    return res.data;
  }
  
  async stopDiscover(param: DeviceRegistrationStopDiscoverParam): Promise<TuyaResponse<boolean>> {

    const res = await this.client.request<boolean>({
      path: `/v1.0/iot-03/device-registration/devices/${param.device_id}/actions/stop-discover`,
      method: 'POST',
      body: param,
    });
    return res.data;
  }

  async subDevice(param: DeviceRegistrationSubDeviceParam): Promise<TuyaResponse<DeviceRegistrationSubDeviceResult[]>> {
    const res = await this.client.request<DeviceRegistrationSubDeviceResult[]>({
      path: `/v1.0/iot-03/device-registration/devices/${param.device_id}/sub-devices`,
      method: 'POST',
      query: param,
    });
    return res.data;
  }

  
}

export {
  TuyaOpenApiDeviceRegistrationService
}
export default TuyaOpenApiDeviceRegistrationService;
