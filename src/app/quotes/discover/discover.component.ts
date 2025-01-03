import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Quote } from '../../domain/quote';
import { Topic } from '../../domain/topic';
import { QuoteService } from '../../client/quote.service';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatChipsModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css',
})
export class DiscoverQuoteComponent {
  quotes: Quote[] = new Array();
  topics: string[] = new Array();

  constructor(
    private quoteService: QuoteService,
    private titleService: Title,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      environment.titleWebSite + ' - Descrubriendo frases'
    );
    this.getTopics();
  }

  getTopics() {
    this.quoteService.getTopics().subscribe({
      next: (response) => {
        this.topics = response;
      },
      error: (error) => {
        console.log('Error searching topics: ' + JSON.stringify(error));
        this.notificationService.openSnackBar(
          'Ups... Algo malo ocurrió. Intenta de nuevo.'
        );
      },
    });
  }

  getQuotes(topic: string, event: any) {
    if (event.selected) {
      this.quoteService.getQuotesByKeyword(topic).subscribe({
        next: (response) => {
          this.quotes = response;
        },
        error: (error) => {
          if (error.status == 404) {
            this.notificationService.openSnackBar(
              'No tenemos frases asociadas a la palabra clave seleccionada...'
            );
          } else {
            console.log('Error searching by keyword: ' + JSON.stringify(error));
            this.notificationService.openSnackBar(
              'Ups... Algo malo ocurrió. Intenta de nuevo.'
            );
          }
        },
      });
    } else {
      this.quotes = [];
    }
  }
}
