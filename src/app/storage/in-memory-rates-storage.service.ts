import {RatesStorageService} from './rates-storage.service';
import {Item} from '../dao/item';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {RatesService} from '../rartes-service/rates.service';
import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {Rates} from '../rates/rates';
import {DataSource} from '@angular/cdk/table';
import {CollectionViewer} from '@angular/cdk/collections';

@Injectable({
  providedIn: 'root'
})
export class InMemoryRatesStorageService implements RatesStorageService, DataSource<Item> {

  private itemsSubject = new BehaviorSubject<Item[]>([]);

  size: number;

  constructor(private ratesService: RatesService) {

  }

  private static log(message: string) {
    console.log(message);
  }

  getRates(from: string, to: string,
           pageIndex?: number, pageSize?: number): Observable<Rates[]> {
    return this.ratesService.getRates(from, to)
      .pipe(tap(() => InMemoryRatesStorageService.log(`found rates from: "${from}" to: "${to}" `)),
      tap((data) => InMemoryRatesStorageService.log(data)),
      catchError(this.handleError<Rates[]>(`getRates from=${from} to=${to}`)));
  }

  loadItems(from: string, to: string,
            pageIndex?: number, pageSize?: number) {
    const items = [];
    this.getRates(from, to, pageIndex, pageSize)
      .subscribe(rates => {
        rates.forEach(ratesResult => {
          ratesResult.items.forEach(item => {
            item.exchange = ratesResult.exchange;
            items.push(item);
          });
          this.size = items.length;
        });
        items.sort((a: Item, b: Item) => {
          const rate = a.out / a.in;
          const otherRate = b.out / b.in;
          return rate > otherRate ? -1 : 1;
        });
        this.itemsSubject.next(items);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Item[]> {
    return this.itemsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.itemsSubject.complete();
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error('tried to ' + operation + ' but received an error: ' + error);
      return of(result as T);
    };
  }

}
