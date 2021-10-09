import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Quote } from '../interfaces/quote';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }

  quotesUrl = 'http://localhost:8080/api/quotes';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.quotesUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getQuoteById(idQuote : string): Observable<Quote> {
    const url = `${this.quotesUrl}/${idQuote}`;
    return this.http.get<Quote>(url)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  saveQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.quotesUrl, quote, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateQuote(quote: Quote): Observable<Quote> {
    return this.http.put<Quote>(this.quotesUrl, quote, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteQuote(idQuote: string): Observable<string> {
    const url = `${this.quotesUrl}/${idQuote}`;
    return this.http.delete<string>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
