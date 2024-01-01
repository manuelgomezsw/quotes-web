import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
  {
    path: 'search',
    title: 'Search Quotes',
    component: SearchComponent,
  },
  {
    path: 'new',
    title: 'New Quote',
    component: NewComponent
  },
  {
    path: 'edit/:quote_id',
    title: 'Edit Quote',
    component: EditComponent
  },
];
