import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Review } from '../domain/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(
    private http: HttpClient
  ) { }

  getByID(reviewID: number): Observable<any> {
    return this.http.get(environment.reviewsUrl + "/" + reviewID.toString());
  }

  getByTitle(title: string): Observable<any> {
    return this.http.get(environment.reviewsUrl + "/title/" + title);
  }

  add(review: Review): Observable<any> {
    return this.http.post(environment.reviewsUrl, review);
  }

  edit(review: Review): Observable<any> {
    return this.http.put(environment.reviewsUrl + "/" + review.review_id, review);
  }

  delete(reviewID: number): Observable<any> {
    return this.http.delete(environment.reviewsUrl + "/" + reviewID);
  }
}
