import { Component } from '@angular/core';
import {RandomItemComponent} from "../shared/components/random-item/random-item.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RandomItemComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
