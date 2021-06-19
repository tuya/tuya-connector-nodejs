import { TuyaOpenApiClient } from '../core/client';
import { TuyaResponse } from '../interfaces';

interface TuyaOpenApiAssetsGetParam {
  assetId: string;
}

interface TuyaOpenApiAssetsGetResult {
  assetId: string;
  parent_asset_id: string;
  asset_name: string;
  asset_full_name: string;
}

interface TuyaOpenApiAssetsListParam {
  assetId: string[];
}

interface TuyaOpenApiAssetsListResult {
  assetId: string;
  parent_asset_id: string;
  asset_name: string;
  asset_full_name: string;
}

interface TuyaOpenApiAssetsChildAssetsParam {
  asset_id: string;
  last_row_key?: string;
  page_size: number;
}

interface TuyaOpenApiAssetsChildAssetsResult {
  list: {
    asset_id: string;
    parent_asset_id: string;
    asset_name: string;
    asset_full_name: string;
  }[];
  page_size: string;
  has_next: boolean;
  last_row_key: string;
}


interface TuyaOpenApiAssetsDevicesParam {
  asset_id: string;
  last_row_key?: string;
  page_size: number;
}

interface TuyaOpenApiAssetsDevicesResult {
  list: {
    device_id: string;
    asset_id: string;
    asset_name: string;
  }[];
  last_row_key: string;
  page_size: string;
  has_next: boolean;
}

interface TuyaOpenApiAssetsAddParam {
  name: string;
  meta_id?: string;
  parent_asset_id?: string;
}

interface TuyaOpenApiAssetsUpdateParam {
  asset_id: string;
  name: string;
  meta_id?: string;
}

interface TuyaOpenApiAssetsDeleteParam {
  asset_id: string;
}

class TuyaOpenApiAssetsService {
  private client: TuyaOpenApiClient;
  
  constructor(client: TuyaOpenApiClient) {
    this.client = client;
  }

  async get(param: TuyaOpenApiAssetsGetParam): Promise<TuyaResponse<TuyaOpenApiAssetsGetResult>> {

    const res = await this.client.request<TuyaOpenApiAssetsGetResult>({
      path: `/v1.0/iot-02/assets/${param.assetId}`,
      method: 'GET',
    });
    return res.data;
  }


  async assets(param: TuyaOpenApiAssetsListParam): Promise<TuyaResponse<TuyaOpenApiAssetsListResult>> {

    const res = await this.client.request<TuyaOpenApiAssetsListResult>({
      path: `/v1.0/iot-02/assets`,
      method: 'GET',
      query: param
    });
    return res.data;
  }

  async childAssets(param: TuyaOpenApiAssetsChildAssetsParam): Promise<TuyaResponse<TuyaOpenApiAssetsChildAssetsResult>> {

    const res = await this.client.request<TuyaOpenApiAssetsChildAssetsResult>({
      path: `/v1.0/iot-02/assets/${param.asset_id}/sub-assets`,
      method: 'GET',
      query: param,
    });
    return res.data;
  }


  async devices(param: TuyaOpenApiAssetsDevicesParam): Promise<TuyaResponse<TuyaOpenApiAssetsDevicesResult>> {

    const res = await this.client.request<TuyaOpenApiAssetsDevicesResult>({
      path: `/v1.0/iot-02/assets/${param.asset_id}/devices`,
      method: 'GET',
      query: param
    });
    return res.data;
  }


  async add(param: TuyaOpenApiAssetsAddParam): Promise<TuyaResponse<string>> {
    const res = await this.client.request<string>({
      path: `/v1.0/iot-02/assets`,
      method: 'POST',
      body: param
    });
    return res.data;
  }

  
  async update(param: TuyaOpenApiAssetsUpdateParam): Promise<TuyaResponse<boolean>> {
    const res = await this.client.request<boolean>({
      path: `/v1.0/iot-02/assets/${param.asset_id}`,
      method: 'PUT',
      body: param
    });
    return res.data;
  }

  async delete(param: TuyaOpenApiAssetsDeleteParam): Promise<TuyaResponse<boolean>> {
    const res = await this.client.request<boolean>({
      path: `/v1.0/iot-02/assets/${param.asset_id}`,
      method: 'DELETE',
      body: param
    });
    return res.data;
  }

}

export {
  TuyaOpenApiAssetsService,
}
export default TuyaOpenApiAssetsService;
