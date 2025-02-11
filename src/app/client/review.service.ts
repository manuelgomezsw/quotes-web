import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, shareReplay} from 'rxjs';

import {environment} from '../../environments/environment';
import {Review} from '../domain/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  // TTL en milisegundos (1 hora)
  private readonly TTL = 3600000;

  // Variables privadas para almacenar los observables cacheados.
  private reviews$: Observable<any> | undefined;

  constructor(
    private http: HttpClient
  ) {
  }

  get(): Observable<any> {
    if (!this.reviews$) {
      this.reviews$ = this.http.get(environment.reviewsUrl)
        .pipe(
          shareReplay({bufferSize: 1, windowTime: this.TTL, refCount: true})
        );
    }
    return this.reviews$;
  }

  getByID(reviewID: any): Observable<any> {
    return this.http.get(environment.reviewsUrl + "/" + reviewID.toString());
  }

  getByTitle(title: string): Observable<any> {
    return this.http.get(environment.reviewsUrl + "?title=" + title);
  }

  add(review: Review): Observable<any> {
    return this.http.post(environment.reviewsUrl, review);
  }

  edit(review: Review): Observable<any> {
    return this.http.put(environment.reviewsUrl + "/" + review.review_id, review);
  }

  delete(reviewID: any): Observable<any> {
    return this.http.delete(environment.reviewsUrl + "/" + reviewID);
  }
}
