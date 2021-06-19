import { TuyaOpenApiClient } from '../../core/client';
import { TuyaResponse } from '../../interfaces';

interface DeviceStatusServiceStatusParam {
  device_id: string;
}

interface DeviceStatusServiceStatusResult {
  code: string;
  value: string;
}

interface DeviceStatusServiceStatusListParam {
  device_ids: string[];
}

interface DeviceStatusServiceStatusListResult {
  id: string;
  status: {
    code: string;
    value: string;
  }[];
}


class TuyaOpenApiDeviceStatusService {
  private client: TuyaOpenApiClient;

  constructor(client: TuyaOpenApiClient) {
    this.client = client;
  }

  async status(param: DeviceStatusServiceStatusParam): Promise<TuyaResponse<DeviceStatusServiceStatusResult>> {
    const res = await this.client.request<DeviceStatusServiceStatusResult>({
      path: `/v1.0/iot-03/devices/${param.device_id}/status`,
      method: 'GET',
    });
    return res.data;
  }

  async statusList(param: DeviceStatusServiceStatusListParam): Promise<TuyaResponse<DeviceStatusServiceStatusListResult>> {
    const res = await this.client.request<DeviceStatusServiceStatusListResult>({
      path: `/v1.0/iot-03/devices/status`,
      method: 'GET',
      query: param
    });
    return res.data;
  }
}

export {
  TuyaOpenApiDeviceStatusService
}
export default TuyaOpenApiDeviceStatusService;
