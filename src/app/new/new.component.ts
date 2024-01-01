import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { QuoteService } from '../quote.service';
import { Quote } from '../quote';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewComponent {
  quote: Quote = {
    phrase: '',
  };

  constructor(private quoteService: QuoteService, private router: Router) {}

  onMemorizeQuote() {
    this.quoteService.addQuote(this.quote).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
        //this.notificationService.openSnackBar('Quote added!');
      },
      error: (error) => {
        console.log('Error adding new quote: ' + JSON.stringify(error));
        //this.logger.error('Error adding new quote: ' + JSON.stringify(error));
        // this.notificationService.openSnackBar(
        //   'Something went wrong... Try again.'
        // );
      },
    });
  }
}
