import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ContactsComponent } from './contacts/contacts.component';
 import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { LogoutComponent } from './logout/logout.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { SuppressionComponent } from './suppression/suppression.component';
import { DeletedContactsComponent } from './deleted-contacts/deleted-contacts.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: 'contact-details/:id', component: ContactDetailsComponent },
  { path: 'update-contact/:id', component: UpdateContactComponent },
  { path: 'suppression/:id', component: SuppressionComponent },
  { path: 'deleted-contacts', component: DeletedContactsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
{path: 'logout',component:LogoutComponent}
];
