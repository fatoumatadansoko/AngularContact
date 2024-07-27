import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
// import { AddContactComponent } from './add-contact/add-contact.component';

import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    LoginComponent,
    RegisterComponent,
    ContactsComponent,
    // AddContactComponent,
    ContactDetailsComponent,
    RouterOutlet,
     ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', Validators.required),
      etat: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // Enregistrement des données dans le Local Storage
      localStorage.setItem('formData', JSON.stringify(this.form.value));
      
      // Affichage des données dans la console
     // console.log(this.form.value);
    }
  }
}
