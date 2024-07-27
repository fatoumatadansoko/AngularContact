
import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
 import { AddContactComponent } from './add-contact/add-contact.component';
 import { FormsModule } from '@angular/forms';
import { SuppressionComponent } from './suppression/suppression.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    FormsModule,
    RouterModule,
    LoginComponent,
    RegisterComponent,
    ContactsComponent,
     AddContactComponent,
    ContactDetailsComponent,
    SuppressionComponent
   
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent  {


}
