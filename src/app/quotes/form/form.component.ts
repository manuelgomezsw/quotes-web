import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule} from '@angular/forms';
import {Observable} from "rxjs";
import {Title} from '@angular/platform-browser';
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from "@angular/material/progress-bar";

import {environment} from '../../../environments/environment';
import {Quote} from '../../domain/quote';
import {NotificationService} from "../../services/notification.service";
import {CookiesService} from "../../services/cookies.service";
import {QuoteService} from '../../client/quote.service';
import {MiscService} from "../../client/misc.service";
import {AutocompleteInputComponent} from "../../shared/components/autocomplete-input/autocomplete-input.component";
import {setupAutocompleteFromService} from "../../shared/utils/autocomplete-utils";
import {filterOptions} from "../../shared/utils/filter.utils";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    AutocompleteInputComponent,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatToolbarModule,
    NgIf
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class QuoteFormComponent implements OnInit {
  isEditMode = false;
  isLoading = false;
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
    private cookiesService: CookiesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    const quote_id = this.route.snapshot.paramMap.get('quote_id');
    if (quote_id) {
      this.isEditMode = true;
      this.quote.quote_id = Number(quote_id);
      this.loadQuote(quote_id);
    }

    this.titleService.setTitle(environment.titleWebSite + (this.isEditMode ? 'Memorizar frase' : 'Actualizar frase'));

    if (!this.isEditMode) {
      this.getRememberedCookies();
    }

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

  protected onSelectedAuthor(selectedAuthor: any) {
    this.quote.author = selectedAuthor;
  }

  protected onSelectedWork(selectedWork: any) {
    this.quote.work = selectedWork;
  }

  protected onDeleteQuote() {
    this.quoteService.deleteQuote(this.quote.quote_id).subscribe({
      next: (response) => {
        this.router.navigate(['quotes/search']);
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

  protected onSave() {
    if (this.isEditMode) {
      this.editQuote();
    } else {
      this.createQuote();
    }
  }

  private loadQuote(quote_id: any) {
    this.isLoading = true;

    this.quoteService.getQuoteByID(quote_id).subscribe({
      next: (response) => {
        this.quote = response;
        this.authorCtrl.setValue(this.quote.author);
        this.workCtrl.setValue(this.quote.work);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching by keyword: ' + JSON.stringify(error));
        this.notificationService.openSnackBar(
          'Algo malo ocurrió consultando la frase. Intenta de nuevo.'
        );
        this.isLoading = false;
      },
    });
  }

  private createQuote() {
    this.isLoading = true;

    this.quoteService.addQuote(this.quote).subscribe({
      next: () => {
        this.setRememberedCookies();
        this.clearForm();
        this.notificationService.openSnackBar('Frase memorizada');
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error adding new quote: ' + JSON.stringify(error));
        this.notificationService.openSnackBar('Algo malo ocurrió. Intenta de nuevo.');
        this.isLoading = false;
      },
    });
  }

  private editQuote() {
    this.isLoading = true;

    this.quoteService.editQuote(this.quote).subscribe({
      next: (response) => {
        this.router.navigate(['quotes/search']);
        this.notificationService.openSnackBar('Frase editada');
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error editing quote: ' + JSON.stringify(error));
        this.notificationService.openSnackBar(
          'Algo malo ocurrió. Intenta de nuevo.'
        );
        this.isLoading = false;
      },
    });
  }

  private clearForm() {
    this.quote.phrase = "";
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
}
