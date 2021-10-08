import { Component } from '@angular/core';

import { AppService } from './app.service';
import { Quote } from '../interfaces/quote';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public appServices: AppService) {}
  
  public valueToFind : string = '';
  public quotes: Quote[] = [];

  ngOnInit() {
    this.appServices.getQuotes()
      .subscribe(response => this.quotes = response)
  }
}
