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
import {MatProgressBarModule} from "@angular/material/progress-bar";

import {Review} from '../../domain/review';
import {ReviewService} from '../../client/review.service';
import {environment} from '../../../environments/environment';
import {NotificationService} from '../../services/notification.service';

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
  styleUrl: './search.component.css'
})
export class ReviewSearchComponent implements OnInit {
  reviews: Review[] = [];
  keyword: string = '';
  isLoading: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private titleService: Title,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle(environment.titleWebSite + ' - Buscar Opinión');
    this.loadReviews();
  }

  protected onSearchByKeyword() {
    this.isLoading = true;
    this.reviewService.getByTitle(this.keyword).subscribe({
      next: (response) => {
        this.reviews = response;
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

  private loadReviews() {
    this.isLoading = true;
    this.reviewService.get().subscribe({
      next: (response) => {
        this.reviews = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.log('Error searching by keyword: ' + JSON.stringify(error));
        this.notificationService.openSnackBar(
          'Ups... Algo malo ocurrió. Intenta de nuevo.'
        );
        this.isLoading = false;
      },
    });
  }
}
