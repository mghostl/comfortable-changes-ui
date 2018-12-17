import {Item} from '../dao/item';
import {Exchange} from '../dao/exchange';

export class Rates {
  items: Item[];
  exchange: Exchange;

  constructor(items: Item[], exchange: Exchange) {
    this.items = items;
    this.exchange = exchange;
  }
}
