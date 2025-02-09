import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Observable} from "rxjs";

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";

import {Quote} from '../../domain/quote';
import {QuoteService} from '../../client/quote.service';
import {environment} from '../../../environments/environment';
import {NotificationService} from '../../services/notification.service';
import {MiscService} from "../../client/misc.service";
import {SharedModule} from '../../shared/shared.module';
import {filterOptions} from "../../shared/utils/filter.utils";
import {setupAutocompleteFromService} from "../../shared/utils/autocomplete-utils";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'app-search',
  standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        MatToolbarModule,
        RouterModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatAutocompleteModule,
        MatOptionModule,
        ReactiveFormsModule,
        SharedModule,
        MatProgressBarModule,
    ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchQuoteComponent implements OnInit {
  quotes: Quote[] = [];
  keyword: string = '';
  author: string = '';
  work: string = '';
  isLoading: boolean = false;

  // Controles para el autocomplete
  authorCtrl = new FormControl();
  workCtrl = new FormControl();

  // Observables para las opciones filtradas
  authorFilteredOptions!: Observable<string[]>;
  workFilteredOptions!: Observable<string[]>;

  constructor(
    private quoteService: QuoteService,
    private titleService: Title,
    private notificationService: NotificationService,
    private miscService: MiscService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle(environment.titleWebSite + ' - Consultar');
    // Configuramos el autocomplete para autores
    this.authorFilteredOptions = setupAutocompleteFromService(
      this.authorCtrl,
      () => this.miscService.getAuthors(),
      filterOptions
    );
    // Configuramos el autocomplete para obras
    this.workFilteredOptions = setupAutocompleteFromService(
      this.workCtrl,
      () => this.miscService.getWorks(),
      filterOptions
    );
  }

  protected onSearchByKeyword() {
    this.isLoading = true;
    this.quoteService.getQuotesByKeyword(this.keyword).subscribe({
      next: (response) => {
        this.quotes = response;
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status == 404) {
          this.notificationService.openSnackBar('No tenemos coincidencias con lo que buscas...');
        } else {
          console.log('Error searching by keyword: ' + JSON.stringify(error));
          this.notificationService.openSnackBar('Ups... Algo malo ocurrió. Intenta de nuevo.');
        }
        this.isLoading = false;
      },
    });
  }

  protected onSearchByAuthor(selectedAuthor: string) {
    this.isLoading = true;
    this.author = selectedAuthor;
    this.quoteService.getQuotesByAuthor(selectedAuthor).subscribe({
      next: (response) => {
        this.quotes = response;
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status == 404) {
          this.notificationService.openSnackBar('No tenemos coincidencias con lo que buscas...');
        } else {
          console.log('Error searching by keyword: ' + JSON.stringify(error));
          this.notificationService.openSnackBar('Ups... Algo malo ocurrió. Intenta de nuevo.');
        }
        this.isLoading = false;
      },
    });
  }

  protected onSearchByWork(selectedWork: string) {
    this.isLoading = true;
    this.work = selectedWork;
    this.quoteService.getQuotesByWork(selectedWork).subscribe({
      next: (response) => {
        this.quotes = response;
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status == 404) {
          this.notificationService.openSnackBar('No tenemos coincidencias con lo que buscas...');
        } else {
          console.log('Error searching by keyword: ' + JSON.stringify(error));
          this.notificationService.openSnackBar('Ups... Algo malo ocurrió. Intenta de nuevo.');
        }
        this.isLoading = false;
      },
    });
  }
}
