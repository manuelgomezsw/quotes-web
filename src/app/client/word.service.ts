import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Word } from '../domain/word';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  constructor(
    private http: HttpClient
  ) { }

  getByID(wordID: number): Observable<any> {
    return this.http.get(environment.wordsUrl + "/" + wordID.toString());
  }

  getByKeyword(keyword: string): Observable<any> {
    return this.http.get(environment.wordsUrl + "/keyword/" + keyword);
  }

  addWord(word: Word): Observable<any> {
    return this.http.post(environment.wordsUrl, word);
  }

  editWord(word: Word): Observable<any> {
    return this.http.put(environment.wordsUrl + "/" + word.word_id, word);
  }

  deleteWord(wordID: number): Observable<any> {
    return this.http.delete(environment.wordsUrl + "/" + wordID);
  }
}
