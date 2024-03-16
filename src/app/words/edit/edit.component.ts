import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  styleUrl: './edit.component.css'
})
export class EditWordComponent {
  word: Word = {
    word: '',
  };

  constructor(
    private wordService: WordService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      environment.titleWebSite + ' - Editar Palabra'
    );

    const routeParams = this.route.snapshot.paramMap;
    this.word.word_id = Number(routeParams.get('word_id'));
    this.getWord();
  }

  getWord() {
    if (this.word.word_id === undefined) {
      this.router.navigate(['/words']);
    } else {
      this.wordService.getByID(this.word.word_id).subscribe({
        next: (response) => {
          this.word = response;
        },
        error: (error) => {
            console.log('Error getting word: ' + JSON.stringify(error));
            this.notificationService.openSnackBar(
              'Algo malo ocurrió. Intenta de nuevo.'
            );
        },
      });
    }
  }

  onMemorizeWord() {
    this.wordService.editWord(this.word).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
        this.notificationService.openSnackBar('Palabra editada');
      },
      error: (error) => {
        if (error.status == 409) {
          this.notificationService.openSnackBar('La palabra ya existe');
        } else {
          console.log('Error editing word: ' + JSON.stringify(error));
          this.notificationService.openSnackBar(
            'Algo malo ocurrió. Intenta de nuevo.'
          );
        }
      },
    });
  }

  onDeleteWord() {
    if (this.word.word_id === undefined) {
      this.notificationService.openSnackBar(
        'Se requiere una palabra para editar'
      );
    } else {
      this.wordService.deleteWord(this.word.word_id).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
          this.notificationService.openSnackBar('Palabra eliminada');
        },
        error: (error) => {
          console.error('Error deleting word: ' + JSON.stringify(error));
          this.notificationService.openSnackBar(
            'Algo malo ocurrió. Intenta de nuevo.'
          );
        },
      });
    }
  }
}
