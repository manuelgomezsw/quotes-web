import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Title} from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import {NotificationService} from "../../services/notification.service";
import {CookiesService} from "../../services/cookies.service";
import {QuoteService} from '../../client/quote.service';
import {Quote} from '../../domain/quote';
import {environment} from '../../../environments/environment';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {MiscService} from "../../client/misc.service";
import {AutocompleteInputComponent} from "../../shared/components/autocomplete-input/autocomplete-input.component";
import {setupAutocompleteFromService} from "../../shared/utils/autocomplete-utils";
import {filterOptions} from "../../shared/utils/filter.utils";

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AutocompleteInputComponent,
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewQuoteComponent implements OnInit {
  quote: Quote = {
    phrase: '',
  };

  // Controles para el autocomplete
  authorCtrl = new FormControl();
  workCtrl = new FormControl();

  // Observables para las opciones filtradas
  authorFilteredOptions!: Observable<string[]>;
  workFilteredOptions!: Observable<string[]>;

  constructor(
    private quoteService: QuoteService,
    private miscService: MiscService,
    private titleService: Title,
    private notificationService: NotificationService,
    private cookiesService: CookiesService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle(environment.titleWebSite + ' - Memorizar Frase');
    this.getRememberedCookies();

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

  onMemorizeQuote() {
    this.quoteService.addQuote(this.quote).subscribe({
      next: () => {
        this.setRememberedCookies();
        this.clearForm();
        this.notificationService.openSnackBar('Frase memorizada');
      },
      error: (error) => {
        console.log('Error adding new quote: ' + JSON.stringify(error));
        this.notificationService.openSnackBar('Algo malo ocurrió. Intenta de nuevo.');
      },
    });
  }

  private setRememberedCookies() {
    if (this.quote.author !== undefined) {
      this.cookiesService.setCookie("lastAuthor", this.quote.author)
    }

    if (this.quote.work !== undefined) {
      this.cookiesService.setCookie("lastWork", this.quote.work)
    }
  }

  private getRememberedCookies() {
    this.quote.author = this.cookiesService.getCookie("lastAuthor");
    this.quote.work = this.cookiesService.getCookie("lastWork");
  }

  private clearForm() {
    this.quote.phrase = "";
  }
}
