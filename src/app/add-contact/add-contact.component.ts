import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  form: FormGroup;

  constructor(private router: Router) {
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
      const userEmail = localStorage.getItem('currentUserEmail');
      if (userEmail) {
        const contact = { ...this.form.value, id: uuidv4(), userEmail };
        const contacts = JSON.parse(localStorage.getItem('Contacts') || '[]');
        contacts.push(contact);
        localStorage.setItem('Contacts', JSON.stringify(contacts));
        this.form.reset();
        this.router.navigate(['/contacts']);
      } else {
        console.error('User not logged in');
      }
    }
  }

  retour() {
    this.router.navigate(['/contacts']);
  }
}
