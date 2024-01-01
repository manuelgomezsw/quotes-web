import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Quote } from '../quote';
import { QuoteService } from '../quote.service';

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
    MatIconModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  quotes: Quote[] = new Array();
  keyword: string = '';

  constructor(private quoteService: QuoteService) {}

  onSearchByKeyword() {
    console.log(this.keyword);
    this.quoteService.getQuotesByKeyword(this.keyword).subscribe({
      next: (response) => {
        this.quotes = response;
      },
      error: (error) => {
        if (error.status != 404) {
          console.log('Error searching by keyword: ' + JSON.stringify(error));
          //this.logger.error("Error searching by keyword: " + JSON.stringify(error));
          //this.notificationService.openSnackBar('Something went wrong... Try search again.');
        }
      },
    });
  }

  onClearKeyword() {
    this.keyword = "";
    this.quotes = new Array();
  }
}
