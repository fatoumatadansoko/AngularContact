import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    LoginComponent,
    RegisterComponent,
    ContactsComponent,
    AddContactComponent,
    ContactDetailsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ContactsAngular';
}
