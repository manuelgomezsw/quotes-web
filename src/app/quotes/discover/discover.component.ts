import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";

import {Quote} from '../../domain/quote';
import {QuoteService} from '../../client/quote.service';
import {environment} from '../../../environments/environment';
import {NotificationService} from '../../services/notification.service';
import {MatListModule, MatSelectionListChange} from "@angular/material/list";

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
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
  ],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css',
})
export class DiscoverQuoteComponent implements OnInit {
  quotes: Quote[] = [];
  topics: string[] = [];

  constructor(
    private quoteService: QuoteService,
    private titleService: Title,
    private notificationService: NotificationService
  ) {
  }

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

  onSelectionChange(event: MatSelectionListChange) {
    if (event.source.selectedOptions.selected.length === 0) {
      console.log("Limpiar");
    } else {
      const selectedTopics = event.source.selectedOptions.selected.map(option => option.value);
      console.log('Temas seleccionados:', selectedTopics); // La selección múltiple es un array de string. Se debe cambiar el endpoint para que reciba en el body el array de keywords.
    }

    /*
    this.quoteService.getQuotesByKeyword(event.value).subscribe({
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
     */
  }
}
