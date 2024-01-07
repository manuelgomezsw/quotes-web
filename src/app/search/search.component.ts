import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Quote } from '../quote';
import { QuoteService } from '../quote.service';
import { environment } from '../../environments/environment';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  quotes: Quote[] = new Array();
  keyword: string = '';

  constructor(
    private quoteService: QuoteService,
    private titleService: Title,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(environment.titleWebSite + ' - Descubrir');
  }

  onSearchByKeyword() {
    console.log(this.keyword);
    this.quoteService.getQuotesByKeyword(this.keyword).subscribe({
      next: (response) => {
        this.quotes = response;
      },
      error: (error) => {
        if (error.status != 404) {
          console.log('Error searching by keyword: ' + JSON.stringify(error));
          this.notificationService.openSnackBar('Algo malo ocurrió. Intenta de nuevo.');
        }
      },
    });
  }

  onClearKeyword() {
    this.keyword = '';
    this.quotes = new Array();
  }
}
