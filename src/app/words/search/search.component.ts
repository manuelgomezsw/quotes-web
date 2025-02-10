import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

import {Word} from '../../domain/word';
import {WordService} from '../../client/word.service';
import {environment} from '../../../environments/environment';
import {NotificationService} from '../../services/notification.service';
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
    MatProgressBarModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class WordSearchComponent implements OnInit {
  isLoading: boolean = false;
  words: Word[] = [];
  keyword: string = '';

  constructor(
    private wordService: WordService,
    private titleService: Title,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle(environment.titleWebSite + ' - Descubrir Palabra');
  }

  onSearchByKeyword() {
    this.isLoading = true;
    this.wordService.getByKeyword(this.keyword).subscribe({
      next: (response) => {
        this.words = response;
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status == 404) {
          this.notificationService.openSnackBar(
            'No tenemos coincidencias con lo que buscas...'
          );
        } else {
          console.log('Error searching by keyword: ' + JSON.stringify(error));
          this.notificationService.openSnackBar(
            'Ups... Algo malo ocurrió. Intenta de nuevo.'
          );
        }
        this.isLoading = false;
      },
    });
  }
}
