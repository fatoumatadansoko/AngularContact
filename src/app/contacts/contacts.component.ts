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

  phone: string; // Assurez-vous que cela correspond à "telephone" dans le formulaire
  state?: string; // Assurez-vous que cela correspond à "etat" dans le formulaire
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  message: string;
  userEmail: string;
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

    if (this.isLocalStorageAvailable()) {
      this.loadContacts();
      this.sortContacts();
      this.filteredContacts = this.contacts; // Initialiser les contacts filtrés avec la liste complète des contacts
  
      this.searchControl.valueChanges
        .pipe(
          debounceTime(300),
          map(value => this.filterContacts(value))
        )
        .subscribe();
  
      // Récupérer le nom de l'utilisateur depuis le localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.currentUserName = currentUser.name || 'Utilisateur';
    } else {
      console.error('localStorage is not available.');
    }

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

    const userEmail = localStorage.getItem('currentUserEmail');
    if (userEmail) {
      const contacts = JSON.parse(localStorage.getItem('Contacts') || '[]');
      this.contacts = contacts.filter((contact: Contact) => contact.userEmail === userEmail);
      this.filteredContacts = [...this.contacts]; // Utilisez un nouvel array pour éviter les références directes
      console.log('Contacts loaded:', this.contacts); // Debugging line
    } else {
      console.error('User not logged in');

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

    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserEmail');
    } else {
      console.error('localStorage is not available.');

    }
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


  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

}
