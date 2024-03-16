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

import { Review } from '../../domain/review';
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
export class NewReviewComponent {
  review: Review = {
    title: '',
    review: ''
  };

  constructor(
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private wordService: WordService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      environment.titleWebSite + ' - Memorizar Opinión'
    );
  }

  onMemorizeReview() {
    // this.wordService.addWord(this.word).subscribe({
    //   next: () => {
    //     this.clearForm();
    //     this.notificationService.openSnackBar('Palabra memorizada');
    //   },
    //   error: (error) => {
    //     if (error.status == 409) {
    //       this.notificationService.openSnackBar('La palabra ya existe');
    //     } else {
    //       console.log('Error adding new word: ' + JSON.stringify(error));
    //       this.notificationService.openSnackBar(
    //         'Algo malo ocurrió. Intenta de nuevo.'
    //       );
    //     }
    //   },
    // });
    this.notificationService.openSnackBar('Opinión memorizada');
  }

  clearForm() {
    this.review.title = '';
    this.review.review = '';
  }
}
