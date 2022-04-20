import { TuyaOpenApiClient } from '../../core/client';
import { TuyaResponse } from '../../interfaces';

interface DeviceFunctionServiceCategoriesParam {
  category: 'kg' | 'cz' | 'dj' | string;
}

interface DeviceFunctionServiceCategoriesResult {
  category: string;
  functions: {
    code: string;
    type: string;
    values: string;
    name: string;
    desc: string;
  }[];
}

interface DeviceFunctionServiceDeviceParam {
  device_id: string;
}

interface DeviceFunctionServiceDeviceResult {
  category: string;
  functions: {
    code: string;
    type: string;
    values: string;
    name: string;
    desc: string;
  }[];

}

interface DeviceFunctionServiceSpecificationParam {
  device_id: string;
}

type StatusFunctionsType = {
  code: string;
  type: string;
  name: string;
  values: string;
  lang_config: {[key: string]: string};
}

interface DeviceFunctionServiceSpecificationResult {
  category: string;
  status: StatusFunctionsType[];
  functions: StatusFunctionsType[];
}

type ObjectType = { [key: string]: string | number | boolean; };

interface DeviceFunctionServiceCommandParam {
  device_id: string;
  commands: {
    code: string;
    value: string | boolean | number | ObjectType;
  }[];
}


class TuyaOpenApiDeviceFunctionService {
  private client: TuyaOpenApiClient;

  constructor(client: TuyaOpenApiClient) {
    this.client = client;
  }

  async categories(param: DeviceFunctionServiceCategoriesParam): Promise<TuyaResponse<DeviceFunctionServiceCategoriesResult>> {
    const res = await this.client.request<DeviceFunctionServiceCategoriesResult>({
      path: `/v1.0/iot-03/categories/${param.category}/functions`,
      method: 'GET',
    });
    return res.data;
  }
  async devices(param: DeviceFunctionServiceDeviceParam): Promise<TuyaResponse<DeviceFunctionServiceDeviceResult>> {
    const res = await this.client.request<DeviceFunctionServiceDeviceResult>({
      path: `/v1.0/iot-03/devices/${param.device_id}/functions`,
      method: 'GET',
    });
    return res.data;

  }

  async specification(param: DeviceFunctionServiceSpecificationParam): Promise<TuyaResponse<DeviceFunctionServiceSpecificationResult>> {
    const res = await this.client.request<DeviceFunctionServiceSpecificationResult>({
      path: `/v1.2/iot-03/devices/${param.device_id}/specification`,
      method: 'GET',
    });
    return res.data;
  }

  async command(param: DeviceFunctionServiceCommandParam): Promise<TuyaResponse<boolean>> {
    const res = await this.client.request<boolean>({
      path: `/v1.0/iot-03/devices/${param.device_id}/commands`,
      method: 'POST',
      body : {
        commands: param.commands
      }
    });
    return res.data;
  }

}

export {
  TuyaOpenApiDeviceFunctionService,
  DeviceFunctionServiceCategoriesParam,
  DeviceFunctionServiceCategoriesResult,
  DeviceFunctionServiceDeviceParam,
  DeviceFunctionServiceDeviceResult,
  DeviceFunctionServiceSpecificationParam,
  DeviceFunctionServiceSpecificationResult,
  DeviceFunctionServiceCommandParam,
};
export default TuyaOpenApiDeviceFunctionService;
