import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { NotificationService } from "../../services/notification.service";
import { CookiesService } from "../../services/cookies.service";
import { Word } from '../../domain/word';
import { environment } from '../../../environments/environment';


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
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css',
})
export class NewWordComponent {
  word: Word = {
    name: '',
  };

  constructor(
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private cookiesService: CookiesService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(environment.titleWebSite + ' - Memorizar Palabra');
    this.getRememberedCookies();
  }

  onMemorizeWord() {
    // this.quoteService.addQuote(this.quote).subscribe({
    //   next: () => {
    //     this.setRememberedCookies();
    //     this.clearForm();
    //     this.notificationService.openSnackBar('Frase memorizada');
    //   },
    //   error: (error) => {
    //     console.log('Error adding new quote: ' + JSON.stringify(error));
    //     this.notificationService.openSnackBar('Algo malo ocurrió. Intenta de nuevo.');
    //   },
    // });
    this.notificationService.openSnackBar('Palabra memorizada');
  }

  setRememberedCookies() {
    // if (this.quote.author !== undefined) {
    //   this.cookiesService.setCookie("lastAuthor", this.quote.author)
    // }

    // if (this.quote.work !== undefined) {
    //   this.cookiesService.setCookie("lastWork", this.quote.work)
    // }
  }

  getRememberedCookies() {
    // this.quote.author = this.cookiesService.getCookie("lastAuthor");
    // this.quote.work = this.cookiesService.getCookie("lastWork");
  }

  clearForm() {
    // this.quote.phrase = "";
  }
}
