import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";

import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressBarModule} from "@angular/material/progress-bar";

import {environment} from "../../../environments/environment";
import {Word} from "../../domain/word";
import {WordService} from "../../client/word.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressBarModule,
    NgIf
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class WordFormComponent implements OnInit {
  word: Word = {
    word: '',
  };
  isEditMode = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private wordService: WordService,
    private titleService: Title,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    const word_id = this.route.snapshot.paramMap.get('word_id');
    if (word_id) {
      this.isEditMode = true;
      this.word.word_id = Number(word_id);
      this.loadWord(word_id);
    }

    this.titleService.setTitle(environment.titleWebSite + (this.isEditMode ? 'Memorizar palabra' : 'Actualizar palabra'));
  }

  protected onSave(): void {
    if (this.isEditMode) {
      this.editWord();
    } else {
      this.createWord();
    }
  }

  protected onDeleteWord() {
    this.isLoading = true;
    this.wordService.deleteWord(this.word.word_id).subscribe({
      next: (response) => {
        this.router.navigate(['words/search']);
        this.notificationService.openSnackBar('Palabra eliminada');
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error deleting word: ' + JSON.stringify(error));
        this.notificationService.openSnackBar(
          'Algo malo ocurrió. Intenta de nuevo.'
        );
        this.isLoading = false;
      },
    });
  }

  private loadWord(word_id: any) {
    this.isLoading = true;
    this.wordService.getByID(word_id).subscribe({
      next: (response) => {
        this.word = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error getting word: ' + JSON.stringify(error));
        this.notificationService.openSnackBar(
          'Algo malo ocurrió. Intenta de nuevo.'
        );
        this.isLoading = false;
      },
    });
  }

  private createWord(): void {
    this.isLoading = true;
    this.wordService.addWord(this.word).subscribe({
      next: () => {
        this.clearForm();
        this.notificationService.openSnackBar('Palabra memorizada');
        this.isLoading = false;
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
        this.isLoading = false;
      },
    });
  }

  private editWord() {
    this.isLoading = true;
    this.wordService.editWord(this.word).subscribe({
      next: (response) => {
        this.router.navigate(['words/search']);
        this.notificationService.openSnackBar('Palabra editada');
        this.isLoading = false;
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
        this.isLoading = false;
      },
    });
  }

  private clearForm() {
    this.word.word = '';
    this.word.meaning = '';
  }
}
