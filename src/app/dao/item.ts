import {Exchange} from './exchange';

export class Item {
  from: string;
  to: string;
  in: number;
  out: number;
  exchange: Exchange;
  minAmount?: string;
  maxAmount?: string;
  minFee?: string;
  toFee?: string;
  city?: string;
  amount?: number;
  param?: string[];
}
