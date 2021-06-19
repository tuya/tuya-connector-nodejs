import { AxiosInstance } from 'axios';
import { TuyaTokenStorInterface } from './tokenStore';

export interface TuyaContextOptions {
  baseUrl: string;
  accessKey: string;
  secretKey: string;
  store?: TuyaTokenStorInterface;
  rpc?: AxiosInstance;
}
