import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { NotificationService } from '../../services/notification.service';
import { ReviewService } from '../../client/review.service';

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
    private titleService: Title,
    private notificationService: NotificationService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      environment.titleWebSite + ' - Memorizar Opinión'
    );
  }

  onMemorizeReview() {
    this.reviewService.add(this.review).subscribe({
      next: () => {
        this.clearForm();
        this.notificationService.openSnackBar('Opinión memorizada');
      },
      error: (error) => {
        console.log('Error adding new review: ' + JSON.stringify(error));
          this.notificationService.openSnackBar(
            'Algo malo ocurrió. Intenta de nuevo.'
          );
      },
    });
  }

  clearForm() {
    this.review.title = '';
    this.review.review = '';
  }
}
