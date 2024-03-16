import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { NotificationService } from '../../services/notification.service';
import { WordService } from '../../client/word.service';

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
    word: '',
  };

  constructor(
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private wordService: WordService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      environment.titleWebSite + ' - Memorizar Palabra'
    );
  }

  onMemorizeWord() {
    this.wordService.addWord(this.word).subscribe({
      next: () => {
        this.clearForm();
        this.notificationService.openSnackBar('Palabra memorizada');
      },
      error: (error) => {
        if (error.status == 409) {
          this.notificationService.openSnackBar('La palabra ya existe');
        } else {
          console.log('Error adding new word: ' + JSON.stringify(error));
          this.notificationService.openSnackBar(
            'Algo malo ocurrió. Intenta de nuevo.'
          );
        }
      },
    });
  }

  clearForm() {
    this.word.word = '';
    this.word.meaning = '';
  }
}
