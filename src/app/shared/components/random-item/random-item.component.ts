import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";

import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

import {QuoteService} from "../../../client/quote.service";
import {WordService} from "../../../client/word.service";

@Component({
  selector: 'app-random-item',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './random-item.component.html',
  styleUrl: './random-item.component.css'
})
export class RandomItemComponent implements OnInit {
  /**
   * Define el tipo de elemento a mostrar: 'quote' para citas o 'word' para palabras.
   */
  @Input() type: 'quote' | 'word' = 'quote';
  item: any;

  constructor(
    private quoteService: QuoteService,
    private wordService: WordService
  ) {
  }

  ngOnInit(): void {
    this.getRandomItem();
  }

  get editRoute(): string {
    if (!this.item) {
      return '';
    }

    return this.type === 'quote'
      ? '/quotes/edit/' + this.item.quote_id
      : '/words/edit/' + this.item.word_id;
  }

  get titleText(): string {
    if (!this.item) {
      return '';
    }

    return this.type === 'quote' ? this.item.author : this.item.word;
  }

  get subtitleText(): string {
    if (!this.item) {
      return '';
    }

    return this.type === 'quote' ? this.item.work : '';
  }

  get contentText(): string {
    if (!this.item) {
      return '';
    }

    return this.type === 'quote' ? this.item.phrase : this.item.meaning;
  }

  protected getRandomItem(): void {
    if (this.type === 'quote') {
      this.getRandomQuote();
    }

    if (this.type === 'word') {
      this.getRandomWord();
    }
  }

  private getRandomQuote() {
    this.quoteService.getRandomQuote().subscribe({
      next: (item) => this.item = item,
      error: (err) => console.error('Error al obtener cita aleatoria', err)
    });
  }

  private getRandomWord() {
    this.wordService.getRandomWord().subscribe({
      next: (item) => this.item = item,
      error: (err) => console.error('Error al obtener palabra aleatoria', err)
    });
  }
}
