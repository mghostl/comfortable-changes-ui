import {Observable} from 'rxjs';
import {Rates} from '../rates/rates';

export interface RatesStorageService {
  getRates(from: string, to: string): Observable<Rates[]>;
}
