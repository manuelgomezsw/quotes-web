import {Component, OnInit} from '@angular/core';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {Review} from "../../domain/review";
import {ReviewService} from "../../client/review.service";
import {Title} from "@angular/platform-browser";
import {NotificationService} from "../../services/notification.service";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatProgressBarModule,
    MatToolbarModule,
    NgIf,
    MatButtonModule,
    MatCardModule,
    DatePipe,
    NgForOf,
    RouterLink,
    NgClass,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class ReviewDetailComponent implements OnInit {
  isLoading: boolean = false;
  review: Review = {};

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private titleService: Title,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    const review_id = this.route.snapshot.paramMap.get('review_id');
    if (review_id) {
      this.review.review_id = Number(review_id);
      this.loadReview(review_id);
    }

    this.titleService.setTitle(environment.titleWebSite + ' - ' + this.review.title);
  }

  private loadReview(review_id: any): void {
    this.isLoading = true;
    this.reviewService.getByID(review_id).subscribe({
      next: (response) => {
        this.review = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error loading review: ' + JSON.stringify(error));
        this.notificationService.openSnackBar(
          'Ups... Algo malo ocurrió. Intenta de nuevo.'
        );
        this.isLoading = false;
      },
    });
  }
}
