import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { AppService } from '../app.service';
import { Quote } from '../../interfaces/quote';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent implements OnInit {

  @Output() saveQuoteEvent = new EventEmitter();

  constructor(public appServices: AppService) { }

  ngOnInit() {

  }

  quote = {} as Quote;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  keywords: string[] = [];

  addKeywordQuote(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.push(value);
    }

    event.chipInput!.clear();
  }

  removeKeywordQuote(keyword: string): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  rememberQuote(author : string, work : string, message : string) {
    this.quote.author = author;
    this.quote.work = work;
    this.quote.tags = this.keywords;
    this.quote.message = message;

    this.saveQuoteEvent.emit(this.quote);
  }
}
