import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";

import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";

import {environment} from "../../../environments/environment";
import {Review} from "../../domain/review";
import {ReviewService} from "../../client/review.service";
import {NotificationService} from "../../services/notification.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    NgIf
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class ReviewFormComponent implements OnInit {
  isLoading = false;
  isEditMode = false;
  review: Review = {
    title: '',
    review: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private notificationService: NotificationService,
    private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    const review_id = this.route.snapshot.paramMap.get('review_id');
    if (review_id) {
      this.isEditMode = true;
      this.review.review_id = Number(review_id);
      this.loadReview(review_id);
    }

    this.titleService.setTitle(environment.titleWebSite + (this.isEditMode ? 'Memorizar opinión' : 'Actualizar opinión'));
  }

  protected onSave() {
    if (this.isEditMode) {
      this.editReview();
    } else {
      this.createReview();
    }
  }

  protected onDelete() {
    this.isLoading = true;
    this.reviewService.delete(this.review.review_id).subscribe({
      next: (response) => {
        this.router.navigate(['reviews/search']);
        this.notificationService.openSnackBar('Opinión eliminada');
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error deleting review: ' + JSON.stringify(error));
        this.notificationService.openSnackBar(
          'Algo malo ocurrió. Intenta de nuevo.'
        );
        this.isLoading = false;
      },
    });
  }

  private loadReview(review_id: any) {
    this.isLoading = true;
    this.reviewService.getByID(review_id).subscribe({
      next: (response) => {
        this.review = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching by title: ' + JSON.stringify(error));
        this.notificationService.openSnackBar(
          'Algo malo ocurrió consultando la frase. Intenta de nuevo.'
        );
        this.isLoading = false;
      },
    });
  }

  private createReview() {
    this.isLoading = true;
    this.reviewService.add(this.review).subscribe({
      next: () => {
        this.clearForm();
        this.notificationService.openSnackBar('Opinión memorizada');
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error adding new review: ' + JSON.stringify(error));
        this.notificationService.openSnackBar(
          'Algo malo ocurrió. Intenta de nuevo.'
        );
        this.isLoading = false;
      },
    });
  }

  private editReview() {
    this.isLoading = true;
    this.reviewService.edit(this.review).subscribe({
      next: () => {
        this.router.navigate(['reviews/search']);
        this.notificationService.openSnackBar('Opinión editada');
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error adding new review: ' + JSON.stringify(error));
        this.notificationService.openSnackBar(
          'Algo malo ocurrió. Intenta de nuevo.'
        );
        this.isLoading = false;
      },
    });
  }

  private clearForm() {
    this.review.title = '';
    this.review.review = '';
  }
}
