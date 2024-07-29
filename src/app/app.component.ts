
import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
 import { AddContactComponent } from './add-contact/add-contact.component';
 import { FormsModule } from '@angular/forms';
import { SuppressionComponent } from './suppression/suppression.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

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
