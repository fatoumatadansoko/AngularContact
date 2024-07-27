import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  state?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  description?: string;
}

@Component({
  selector: 'app-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ContactsComponent {
  contactForm: FormGroup;
  contacts: Contact[] = [];
  deletedContacts: Contact[] = [];
  isAddingContact = false;
  viewingDeletedContacts = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  addContact() {
    if (this.contactForm.invalid) {
      return;
    }
    const newContact: Contact = {
      id: this.generateId(),
      ...this.contactForm.value
    };
    this.contacts.push(newContact);
    this.contactForm.reset();
  }

  deleteContact(contact: Contact) {
    this.deletedContacts.push(contact);
    this.contacts = this.contacts.filter(c => c.id !== contact.id);
  }

  restoreContact(contact: Contact) {
    this.contacts.push(contact);
    this.deletedContacts = this.deletedContacts.filter(c => c.id !== contact.id);
  }

  permanentlyDeleteContact(contact: Contact) {
    this.deletedContacts = this.deletedContacts.filter(c => c.id !== contact.id);
  }

  cancelViewDeleted() {
    this.viewingDeletedContacts = false;
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
