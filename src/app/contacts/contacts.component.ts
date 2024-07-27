import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

export interface Contact {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  state?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

@Component({
  selector: 'app-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule]
})
export class ContactsComponent implements OnInit {
  contactForm: FormGroup;
  searchControl: FormControl = new FormControl('');
  contacts: Contact[] = [];
  deletedContacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  filteredDeletedContacts: Contact[] = [];
  viewingDeletedContacts = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadContacts();
    this.filteredContacts = this.contacts; // Initialiser les contacts filtrés avec la liste complète des contacts

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        map(value => this.filterContacts(value))
      )
      .subscribe();
  }

  filterContacts(searchTerm: string) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    this.filteredContacts = this.contacts.filter(contact =>
      contact.nom.toLowerCase().includes(lowerSearchTerm) ||
      contact.email.toLowerCase().includes(lowerSearchTerm)
    );
    this.filteredDeletedContacts = this.deletedContacts.filter(contact =>
      contact.nom.toLowerCase().includes(lowerSearchTerm) ||
      contact.email.toLowerCase().includes(lowerSearchTerm)
    );
  }

  loadContacts(): void {
    if (typeof localStorage !== 'undefined') {
      const contacts = localStorage.getItem('Contacts');
      if (contacts) {
        this.contacts = JSON.parse(contacts);
        this.filteredContacts = this.contacts; // Mettre à jour les contacts filtrés après le chargement
      }
    } else {
      console.error("localStorage is not available.");
    }
  }

  viewDetails(contactId: string): void {
    this.router.navigate(['/contact-details', contactId]);
  }
  update(contactId: string): void {
    this.router.navigate(['/update-contact', contactId]);
  }
  delete(contactId: string): void {
    this.router.navigate(['/suppression', contactId]);
  }
  viewDeletedContacts(): void {
    this.router.navigate(['/deleted-contacts']);
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentUser');
    } else {
      console.error("localStorage is not available.");
    }
    this.router.navigate(['/login']);
  }

  addContact() {
    this.router.navigate(['/add-contact']);
  }
}
