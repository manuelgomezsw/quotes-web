import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";

import {QuoteService} from "../../../client/quote.service";
import {WordService} from "../../../client/word.service";

@Component({
  selector: 'app-random-item',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgIf,
    MatProgressBarModule
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
  isLoading = false;

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
      ? '/quotes/' + this.item.quote_id + '/edit'
      : '/words/' + this.item.word_id + '/edit';
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
    this.clearContent();

    if (this.type === 'quote') {
      this.getRandomQuote();
    }

    if (this.type === 'word') {
      this.getRandomWord();
    }
  }

  private getRandomQuote() {
    this.isLoading = true;
    this.quoteService.getRandomQuote().subscribe({
      next: (item) => {
        this.item = item;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener cita aleatoria', err);
        this.isLoading = false;
      }
    });
  }

  private getRandomWord() {
    this.isLoading = true;
    this.wordService.getRandomWord().subscribe({
      next: (item) => {
        this.item = item;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener palabra aleatoria', err);
        this.isLoading = false;
      }
    });
  }

  private clearContent(): void {
    this.item = null;
  }
}
