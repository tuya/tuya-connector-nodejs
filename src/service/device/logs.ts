import { TuyaOpenApiClient } from '../../core/client';
import { TuyaResponse } from '../../interfaces';

interface DeviceLogServiceLogParam {
  device_id: string;
  event_types: string;
  start_time: number;
  end_time: number;
  codes?: string;
  last_row_key?: string;
  size?: number;
  query_type?: 1 | 2;
}

interface DeviceLogServiceLogResult {
  logs: {
    code: string;
    value: string;
    event_time: string;
    event_from: string;
    event_id: string;
  }[];
  has_next: boolean;
  device_id: string;
  last_row_key: string;
  count: number;
}

interface DeviceLogServiceReportParam {
  device_id: string;
  start_time: number;
  end_time: number;
  codes: string[];
  last_row_key?: string;
  size?: number;
}

interface DeviceLogServiceReportResult {
  device_id: string;
  has_more: boolean;
  last_row_key: string;
  total: number;
  logs: {
    code: string;
    value: string;
    event_time: number;
  }[];

}


class TuyaOpenApiDeviceLogService {
  private client: TuyaOpenApiClient;

  constructor(client: TuyaOpenApiClient) {
    this.client = client;
  }

  async logs(param: DeviceLogServiceLogParam): Promise<TuyaResponse<DeviceLogServiceLogResult>> {
    const res = await this.client.request<DeviceLogServiceLogResult>({
      path: `/v1.0/iot-03/devices/${param.device_id}/logs`,
      method: 'GET',
      query: param,
    });
    return res.data;
  }

  async report(param: DeviceLogServiceReportParam): Promise<TuyaResponse<DeviceLogServiceReportResult>> {
    const res = await this.client.request<DeviceLogServiceReportResult>({
      path: `/v1.0/iot-03/devices/${param.device_id}/report-logs`,
      method: 'GET',
      query: param
    });
    return res.data;
  }
}

export {
  TuyaOpenApiDeviceLogService
}
export default TuyaOpenApiDeviceLogService;
