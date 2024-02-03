import { Routes } from '@angular/router';

import { SearchQuoteComponent } from './quotes/search/search.component';
import { NewQuoteComponent } from './quotes/new/new.component';
import { EditQuoteComponent } from './quotes/edit/edit.component';
import { DiscoverQuoteComponent } from './quotes/discover/discover.component';

import { SearchWordComponent } from './words/search/search.component';
import { NewWordComponent } from './words/new/new.component';
import { EditWordComponent } from './words/edit/edit.component';

export const routes: Routes = [
  {
    path: 'quotes/search',
    title: 'Search Quotes',
    component: SearchQuoteComponent,
  },
  {
    path: 'quotes/new',
    title: 'New Quote',
    component: NewQuoteComponent
  },
  {
    path: 'quotes/edit/:quote_id',
    title: 'Edit Quote',
    component: EditQuoteComponent
  },
  {
    path: 'quotes/discovery',
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
    path: 'words/edit/:word_id',
    title: 'Edit Word',
    component: EditWordComponent
  },
];
