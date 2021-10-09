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
  @Output() updateQuoteEvent = new EventEmitter();

  constructor(public appServices: AppService) { }

  ngOnInit() {

  }

  public quote = {} as Quote;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  selectable = true;
  removable = true;
  addOnBlur = true;
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

  rememberQuote() {
    this.quote.tags = this.keywords;
    
    if (this.quote.id == undefined) {
      this.saveQuoteEvent.emit(this.quote);
    } else {
      this.updateQuoteEvent.emit(this.quote);
    }
  }
}
