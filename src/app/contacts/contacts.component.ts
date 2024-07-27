import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

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
  deleted?: boolean;
}

@Component({
  selector: 'app-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ContactsComponent implements OnInit {
  contactForm: FormGroup;
  searchControl: FormControl = new FormControl('');
  contacts: Contact[] = [];
  deletedContacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  filteredDeletedContacts: Contact[] = [];
  viewingDeletedContacts = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadContacts();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        map(value => this.filterContacts(value))
      )
      .subscribe();
  }

  addContact() {
    if (this.contactForm.invalid) {
      return;
    }
    const newContact: Contact = {
      id: this.generateId(),
      ...this.contactForm.value,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false
    };
    this.contacts.push(newContact);
    this.saveContacts();
    this.contactForm.reset();
    this.filterContacts(this.searchControl.value);
  }

  deleteContact(contact: Contact) {
    contact.deleted = true;
    this.deletedContacts.push(contact);
    this.contacts = this.contacts.filter(c => c.id !== contact.id);
    this.saveContacts();
    this.filterContacts(this.searchControl.value);
  }

  restoreContact(contact: Contact) {
    contact.deleted = false;
    this.contacts.push(contact);
    this.deletedContacts = this.deletedContacts.filter(c => c.id !== contact.id);
    this.saveContacts();
    this.filterContacts(this.searchControl.value);
  }

  permanentlyDeleteContact(contact: Contact) {
    this.deletedContacts = this.deletedContacts.filter(c => c.id !== contact.id);
    this.saveContacts();
  }

  cancelViewDeleted() {
    this.viewingDeletedContacts = false;
  }

  loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.contacts = contacts.filter((contact: Contact) => !contact.deleted);
    this.deletedContacts = contacts.filter((contact: Contact) => contact.deleted);
    this.filterContacts(this.searchControl.value);
  }

  saveContacts() {
    const allContacts = [...this.contacts, ...this.deletedContacts];
    localStorage.setItem('contacts', JSON.stringify(allContacts));
  }

  filterContacts(searchTerm: string) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    this.filteredContacts = this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerSearchTerm) ||
      contact.email.toLowerCase().includes(lowerSearchTerm)
    );
    this.filteredDeletedContacts = this.deletedContacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerSearchTerm) ||
      contact.email.toLowerCase().includes(lowerSearchTerm)
    );
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
