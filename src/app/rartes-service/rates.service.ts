import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

const ENDPOINT = 'http://localhost:8080/'; // TODO move properties to the separate file
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http: HttpClient) {
  }

  private static createParams(from: string, to: string): HttpParams {
    let params = new HttpParams();
    params = params.set('from', from);
    params = params.set('to', to);
    return params;
  }

  private static createParamsFrom(from: string): HttpParams {
    let params = new HttpParams();
    params = params.set('from', from);
    return params;
  }

  static createHeader(): HttpHeaders {
    return HTTP_OPTIONS.headers;
  }

  private static extractData(res: Response) {
    return res || {};
  }

  public getRates(from: string, to: string): Observable<any> {
    const header = RatesService.createHeader();
    const params = RatesService.createParams(from, to);
    return this.http.get(ENDPOINT + 'rates',
      {
        headers: header,
        params: params
      })
      .pipe(map(RatesService.extractData),
        catchError(this.handleError<any>('getRates)')));
  }

  public getCurrencies(): Observable<any> {
    return this.http.get(ENDPOINT + 'currencies', HTTP_OPTIONS)
      .pipe(map(RatesService.extractData),
        catchError(this.handleError<any>('getCurrencies')));
  }

  public getFrom(): Observable<any> {
    return this.http.get(ENDPOINT + 'from', HTTP_OPTIONS)
      .pipe(map(RatesService.extractData),
        catchError(this.handleError<any>('getFrom')));
  }

  public getTo(from: string): Observable<any> {
    const header = RatesService.createHeader();
    const params = RatesService.createParamsFrom(from);
    return this.http.get(ENDPOINT + 'to', {
      headers: header,
      params: params
    })
      .pipe((map(RatesService.extractData),
        catchError(this.handleError<any>('getTo for from: ' + from))));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      // let the app keep running by returning an empty result
      return of(result as T);
    };
  }

}
