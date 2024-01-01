import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { Quote } from '../quote';
import { QuoteService } from '../quote.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  quote: Quote = {
    phrase: '',
  };

  constructor(
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.quote.quote_id = Number(routeParams.get('quote_id'));
    this.getQuote();
  }

  getQuote() {
    if (this.quote.quote_id === undefined) {
      this.router.navigate(['/quotes']);
    } else {
      this.quoteService.getQuoteByID(this.quote.quote_id).subscribe({
        next: (response) => {
          this.quote = response;
        },
        error: (error) => {
          console.error('Error searching by keyword: ' + JSON.stringify(error));
          // this.notificationService.openSnackBar(
          //   'Something went wrong... Search again.'
          // );
        },
      });
    }
  }

  onMemorizeQuote() {
    this.quoteService.editQuote(this.quote).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
        // this.notificationService.openSnackBar('Quote edited!');
      },
      error: (error) => {
        console.error('Error editing quote: ' + JSON.stringify(error));
        // this.notificationService.openSnackBar(
        //   'Something went wrong... Try again.'
        // );
      },
    });
  }

  onDeleteQuote() {
    if (this.quote.quote_id === undefined) {
      // this.notificationService.openSnackBar('QuoteID must be required...');
    } else {
      this.quoteService.deleteQuote(this.quote.quote_id).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
          // this.notificationService.openSnackBar('Quote deleted!');
        },
        error: (error) => {
          console.error('Error deleting quote: ' + JSON.stringify(error));
          // this.notificationService.openSnackBar(
          //   'Something went wrong... Try again.'
          // );
        },
      });
    }
  }
}
