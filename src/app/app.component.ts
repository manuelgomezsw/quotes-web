import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
    public formQuoteDialog: MatDialog
  ) { }

  public valueToFind: string = '';
  public quotes: Quote[] = [];

  ngOnInit() {
    this.getAllQuotes();
  }

  openQuoteFormDialog() {
    const formQuoteDialogReference = this.formQuoteDialog.open(QuoteFormComponent, {
      height: '550px',
      width: '400px'
    });
    const subscribeDialog = formQuoteDialogReference.componentInstance.saveQuoteEvent.subscribe((quoteEmitted) => {
      this.saveQuote(quoteEmitted);
    });
  }

  getAllQuotes() {
    this.appServices.getQuotes()
      .subscribe(response => this.quotes = response);
  }

  deleteQuote(idQuote: string) {
    this.appServices.deleteQuote(idQuote)
      .subscribe(result => console.log(result));
  }

  saveQuote(quote : Quote) {
    console.log("Event emited");
    this.appServices.saveQuote(quote).subscribe(result => console.log(result));
  }
}
