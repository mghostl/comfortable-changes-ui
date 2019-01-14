import { Injectable } from '@angular/core';
import {Item} from '../dao/item';
import {Observable, of} from 'rxjs';
import {RatesStorageService} from './rates-storage.service';
import {Rates} from '../rates/rates';

const EXCHANGE = {name: 'Mock', url: 'http://localhost:8080', ref: 'http://localhost:8080/currencies'};
const ITEMS: Item[] = [
  {from: 'usd', to: 'eur', in: 1.0, out: 2.0, exchange: EXCHANGE },
  {from: 'rur', to: 'btc', in: 3689000, out: 1.0, exchange: EXCHANGE},
  {from: 'eth', to: 'btc', in: 14050, out: 1.5, exchange: EXCHANGE}
];

@Injectable({
  providedIn: 'root'
})
export class MockRatesStorageService implements RatesStorageService {

  constructor() { }

  getRates(from: string, to: string): Observable<Rates[]> {
    return of([new Rates(ITEMS.filter(item => item.from === from && item.to === to), EXCHANGE)]);
  }
}
