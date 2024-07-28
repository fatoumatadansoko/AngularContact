import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Assurez-vous que vous avez cette interface pour typage
export interface Contact {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  status: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  description: string;
}

@Component({
  selector: 'app-deleted-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './deleted-contacts.component.html',
  styleUrls: ['./deleted-contacts.component.scss']
})
export class DeletedContactsComponent implements OnInit {
  deletedContacts: Contact[] = []; // Typé comme tableau de Contact

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadDeletedContacts();
  }

  loadDeletedContacts(): void {
    if (this.isLocalStorageAvailable()) {
      this.deletedContacts = JSON.parse(localStorage.getItem('DeletedContacts') || '[]');
      console.log('Contacts supprimés:', this.deletedContacts); // Ajouter cette ligne pour déboguer
    }
  }

  restoreContact(contactId: string): void {
    if (this.isLocalStorageAvailable()) {
      const contact = this.deletedContacts.find((c) => c.id === contactId);
      if (contact) {
        let contacts = JSON.parse(localStorage.getItem('Contacts') || '[]');
        contacts.push(contact);
        localStorage.setItem('Contacts', JSON.stringify(contacts));

        // Remove from deleted contacts
        this.deletedContacts = this.deletedContacts.filter((c) => c.id !== contactId);
        localStorage.setItem('DeletedContacts', JSON.stringify(this.deletedContacts));

        this.loadDeletedContacts(); // Refresh the list

        // Affiche l'alerte de succès
        Swal.fire({
          title: 'Restauration réussie!',
          text: 'Le contact a été restauré.',
          icon: 'success',
          timer: 2000, // Durée d'affichage en millisecondes
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          this.goBack(); // Redirige vers la page des contacts après l'alerte
        });
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/contacts']);
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'localStorageTest';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
