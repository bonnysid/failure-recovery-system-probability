import { instance } from '@src/api/baseApi';

export type ChartDataRequestData = {
  l1: number;
  l2: number;
  l3: number;
  l4: number;
  l5: number;
  u1: number;
  u2: number;
  u3: number;
  u4: number;
  u5: number;
}

export type ChartDataResponse= {
  t: number[];
  y: number[][];
}

export class ChartApi {
  static async getChartData(data: ChartDataRequestData) {
    return instance.post<ChartDataResponse>('/api/chart', data)
  }
}
