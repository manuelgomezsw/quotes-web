import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { Quote } from './quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(
    private http: HttpClient
  ) { }

  getQuoteByID(quoteID: number): Observable<any> {
    return this.http.get(environment.quotesUrl + "/" + quoteID.toString());
  }

  getQuotesByKeyword(keyword: string): Observable<any> {
    return this.http.get(environment.quotesUrl + "/keyword/" + keyword);
  }

  addQuote(quote: Quote): Observable<any> {
    return this.http.post(environment.quotesUrl, quote);
  }

  editQuote(quote: Quote): Observable<any> {
    return this.http.put(environment.quotesUrl + "/" + quote.quote_id, quote);
  }

  deleteQuote(quoteID: number): Observable<any> {
    return this.http.delete(environment.quotesUrl + "/" + quoteID);
  }
}
