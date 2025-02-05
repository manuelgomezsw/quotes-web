import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, shareReplay} from 'rxjs';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiscService {
  // TTL en milisegundos (1 hora)
  private readonly TTL = 3600000;

  // Variables privadas para almacenar los observables cacheados.
  private authors$: Observable<any> | undefined;
  private works$: Observable<any> | undefined;

  constructor(
    private http: HttpClient
  ) {
  }

  getAuthors(): Observable<any> {
    if (!this.authors$) {
      this.authors$ = this.http.get(environment.authorsUrl)
        .pipe(
          shareReplay({bufferSize: 1, windowTime: this.TTL, refCount: true})
        );
    }
    return this.authors$;
  }

  getWorks(): Observable<any> {
    if (!this.works$) {
      this.works$ = this.http.get(environment.worksUrl)
        .pipe(
          shareReplay({bufferSize: 1, windowTime: this.TTL, refCount: true})
        );
    }
    return this.works$;
  }
}
