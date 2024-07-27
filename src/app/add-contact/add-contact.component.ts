import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      description: ['']
    });
  }

  addContact() {
    if (this.contactForm.invalid) {
      return;
    }
    const contact = this.contactForm.value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({
      id: uuidv4(),
      ...contact,
      createdAt: new Date(),
      createdBy: currentUser.email,
      updatedAt: new Date(),
      updatedBy: currentUser.email,
      deleted: false
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.router.navigate(['/contacts']);
  }
}
