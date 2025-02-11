import {Routes} from '@angular/router';

import {HomeComponent} from "./home/home.component";

import {QuoteSearchComponent} from './quotes/search/search.component';
import {QuoteFormComponent} from "./quotes/form/form.component";

import {WordSearchComponent} from './words/search/search.component';
import {WordFormComponent} from "./words/form/form.component";

import {ReviewSearchComponent} from './reviews/search/search.component';
import {ReviewFormComponent} from "./reviews/form/form.component";
import {ReviewDetailComponent} from "./reviews/detail/detail.component";

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'quotes/search',
    title: 'Search Quotes',
    component: QuoteSearchComponent,
  },
  {
    path: 'quotes/new',
    title: 'New Quote',
    component: QuoteFormComponent
  },
  {
    path: 'quotes/:quote_id/edit',
    title: 'Edit Quote',
    component: QuoteFormComponent
  },
  {
    path: 'words/search',
    title: 'Search Words',
    component: WordSearchComponent,
  },
  {
    path: 'words/new',
    title: 'New Word',
    component: WordFormComponent
  },
  {
    path: 'words/:word_id/edit',
    title: 'Edit Word',
    component: WordFormComponent
  },
  {
    path: 'reviews/search',
    title: 'Search Review',
    component: ReviewSearchComponent,
  },
  {
    path: 'reviews/new',
    title: 'New Review',
    component: ReviewFormComponent
  },
  {
    path: 'reviews/:review_id/edit',
    title: 'Edit Review',
    component: ReviewFormComponent
  },
  {
    path: 'reviews/:review_id/detail',
    title: 'Detail Review',
    component: ReviewDetailComponent
  },
];
