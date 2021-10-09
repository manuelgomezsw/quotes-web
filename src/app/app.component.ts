import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppService } from './app.service';
import { Quote } from '../interfaces/quote';
import { QuoteFormComponent } from '../app/quote-form/quote-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public appServices: AppService,
    public formQuoteDialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  public valueToFind: string = '';
  public quotes: Quote[] = [];

  ngOnInit() {
    this.getAllQuotes();
  }

  openQuoteFormDialog(quote: Quote) {
    const formQuoteDialogReference = this.formQuoteDialog.open(QuoteFormComponent, {
      height: '550px',
      width: '400px'
    });

    formQuoteDialogReference.componentInstance.quote = quote;

    if (Object.keys(quote).length > 0) {
      formQuoteDialogReference.componentInstance.keywords = quote.tags;
    }

    formQuoteDialogReference.componentInstance.saveQuoteEvent.subscribe((quoteEmitted) => {
      this.saveQuote(quoteEmitted);
    });

    formQuoteDialogReference.componentInstance.updateQuoteEvent.subscribe((quoteEmitted) => {
      this.updateQuote(quoteEmitted);
    });
  }

  createQuote() {
    let quote = {} as Quote;
    this.openQuoteFormDialog(quote);
  }

  editQuote(idQuote: string) {
    this.appServices.getQuoteById(idQuote)
      .subscribe(quote => {
        this.openQuoteFormDialog(quote);
      });
  }

  getAllQuotes() {
    this.appServices.getQuotes()
      .subscribe(response => this.quotes = response);
  }

  searchQuotes() {
    console.log(this.valueToFind);
  }

  saveQuote(quote: Quote) {
    this.appServices.saveQuote(quote).subscribe(resultQuoteCreated => {
      this.getAllQuotes();
      this.formQuoteDialog.closeAll();
      this.snackBar.open("Quote created", '', {
        duration: 3000
      });
    });
  }

  updateQuote(quote: Quote) {
    this.appServices.updateQuote(quote).subscribe(resultQuoteCreated => {
      this.getAllQuotes();
      this.formQuoteDialog.closeAll();
      this.snackBar.open("Quote updated", '', {
        duration: 3000
      });
    });
  }

  deleteQuote(idQuote: string) {
    this.appServices.deleteQuote(idQuote)
      .subscribe(resultQuoteDeleted => {
        this.getAllQuotes();
        this.snackBar.open("Quote deleted", '', {
          duration: 3000
        });
      });
  }
}
