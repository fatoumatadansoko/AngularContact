import { Component } from '@angular/core';
import { SuppressionComponent } from './suppression/suppression.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SuppressionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ContactsAngular';
}
