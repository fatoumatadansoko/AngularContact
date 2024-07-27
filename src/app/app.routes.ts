import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ContactsComponent } from './contacts/contacts.component';
// import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contacts', component: ContactsComponent },
  // { path: 'add-contact', component: AddContactComponent },
  { path: 'contact-details/:id', component: ContactDetailsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
{path: 'logout',component:LogoutComponent}
];
