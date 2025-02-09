import {Routes} from '@angular/router';

import {SearchQuoteComponent} from './quotes/search/search.component';
import {DiscoverQuoteComponent} from './quotes/discover/discover.component';

import {SearchWordComponent} from './words/search/search.component';
import {NewWordComponent} from './words/new/new.component';
import {EditWordComponent} from './words/edit/edit.component';

import {SearchReviewComponent} from './reviews/search/search.component';
import {NewReviewComponent} from './reviews/new/new.component';
import {EditReviewComponent} from './reviews/edit/edit.component';
import {HomeComponent} from "./home/home.component";
import {QuoteFormComponent} from "./quotes/form/form.component";

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'quotes/search',
    title: 'Search Quotes',
    component: SearchQuoteComponent,
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
    path: 'quotes/discover',
    title: 'Discovery Quotes',
    component: DiscoverQuoteComponent
  },
  {
    path: 'words/search',
    title: 'Search Words',
    component: SearchWordComponent,
  },
  {
    path: 'words/new',
    title: 'New Word',
    component: NewWordComponent
  },
  {
    path: 'words/:word_id/edit',
    title: 'Edit Word',
    component: EditWordComponent
  },
  {
    path: 'reviews/search',
    title: 'Search Review',
    component: SearchReviewComponent,
  },
  {
    path: 'reviews/new',
    title: 'New Review',
    component: NewReviewComponent
  },
  {
    path: 'reviews/:review_id/edit',
    title: 'Edit Review',
    component: EditReviewComponent
  },
];
