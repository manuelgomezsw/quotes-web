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
import { ReviewService } from '../../client/review.service';

import { Review } from '../../domain/review';
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
export class EditReviewComponent {
  review: Review = {
    title: '',
    review: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(environment.titleWebSite + ' - Editar Opinión');

    const routeParams = this.route.snapshot.paramMap;
    this.review.review_id = Number(routeParams.get('review_id'));
    this.getReview();
  }

  getReview() {
    if (this.review.review_id === undefined) {
      this.router.navigate(['/quotes']);
    } else {
      this.reviewService.getByID(this.review.review_id).subscribe({
        next: (response) => {
          this.review = response;
        },
        error: (error) => {
          console.error('Error searching by title: ' + JSON.stringify(error));
          this.notificationService.openSnackBar(
            'Algo malo ocurrió consultando la frase. Intenta de nuevo.'
          );
        },
      });
    }
  }

  onMemorizeReview() {
    this.reviewService.add(this.review).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.notificationService.openSnackBar('Opinión editada');
      },
      error: (error) => {
        console.log('Error adding new review: ' + JSON.stringify(error));
          this.notificationService.openSnackBar(
            'Algo malo ocurrió. Intenta de nuevo.'
          );
      },
    });
  }

  onDeleteReview() {
    if (this.review.review_id === undefined) {
      this.notificationService.openSnackBar(
        'Se requiere una opinión para editar'
      );
    } else {
      this.reviewService.delete(this.review.review_id).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
          this.notificationService.openSnackBar('Opinión eliminada');
        },
        error: (error) => {
          console.error('Error deleting review: ' + JSON.stringify(error));
          this.notificationService.openSnackBar(
            'Algo malo ocurrió. Intenta de nuevo.'
          );
        },
      });
    }
  }
}
