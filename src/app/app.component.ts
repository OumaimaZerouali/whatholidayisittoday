import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HolidayComponent} from "./holiday/holiday.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HolidayComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'what-holiday';
}
