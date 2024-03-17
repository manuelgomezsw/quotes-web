import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { Quote } from '../../domain/quote';
import { QuoteService } from '../../client/quote.service';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditQuoteComponent implements OnInit {
  quote: Quote = {
    phrase: '',
  };

  constructor(
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(environment.titleWebSite + ' - Editar Frase');

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
          this.notificationService.openSnackBar(
            'Algo malo ocurrió consultando la frase. Intenta de nuevo.'
          );
        },
      });
    }
  }

  onMemorizeQuote() {
    this.quoteService.editQuote(this.quote).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
        this.notificationService.openSnackBar('Frase editada');
      },
      error: (error) => {
        console.error('Error editing quote: ' + JSON.stringify(error));
        this.notificationService.openSnackBar(
          'Algo malo ocurrió. Intenta de nuevo.'
        );
      },
    });
  }

  onDeleteQuote() {
    if (this.quote.quote_id === undefined) {
      this.notificationService.openSnackBar(
        'Se requiere una frase para editar'
      );
    } else {
      this.quoteService.deleteQuote(this.quote.quote_id).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
          this.notificationService.openSnackBar('Frase eliminada');
        },
        error: (error) => {
          console.error('Error deleting quote: ' + JSON.stringify(error));
          this.notificationService.openSnackBar(
            'Algo malo ocurrió. Intenta de nuevo.'
          );
        },
      });
    }
  }
}
