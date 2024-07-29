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
  telephone: string;
  etat: string;
  message: string;
  createdBy: string;
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
  currentUserName: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadContacts();
    this.sortContacts();
    this.filteredContacts = this.contacts;
    this.searchControl.valueChanges
      .pipe(debounceTime(300), map(value => this.filterContacts(value)))
      .subscribe();

    // Récupérer le nom de l'utilisateur depuis le localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserName = currentUser.name || 'Utilisateur';
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
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    const contacts = JSON.parse(localStorage.getItem('Contacts') || '[]');
    this.contacts = contacts.filter((contact: Contact) => contact.createdBy === currentUserEmail);
    this.filteredContacts = this.contacts;
  }

  viewDetails(contactId: string): void {
    this.router.navigate(['/contact-details', contactId]);
  }

  delete(contactId: string): void {
    const index = this.contacts.findIndex(contact => contact.id === contactId);
    if (index !== -1) {
      const deletedContact = this.contacts.splice(index, 1)[0];
      this.deletedContacts.push(deletedContact);
      localStorage.setItem('Contacts', JSON.stringify(this.contacts));
      this.filteredContacts = this.contacts;
    }
  }

  viewDeletedContacts(): void {
    this.viewingDeletedContacts = !this.viewingDeletedContacts;
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserEmail');
    this.router.navigate(['/login']);
  }

  addContact() {
    this.router.navigate(['/add-contact']);
  }

  sortContacts() {
    this.filteredContacts.sort((a, b) => {
      const prenomA = a.prenom.toLowerCase();
      const prenomB = b.prenom.toLowerCase();
      if (prenomA < prenomB) return -1;
      if (prenomA > prenomB) return 1;
      return 0;
    });
  }
}
