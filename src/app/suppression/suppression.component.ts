import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Définition de l'interface Contact pour typer les données des contacts
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

// Déclaration du composant SuppressionComponent
@Component({
  selector: 'app-suppression',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suppression.component.html',
  styleUrls: ['./suppression.component.scss']
})
export class SuppressionComponent implements OnInit {
  // Initialisation des tableaux pour stocker les contacts et les contacts supprimés
  contacts: Contact[] = [];
  trash: Contact[] = [];
  
  // Clés utilisées pour stocker et récupérer les données dans le localStorage
  storageKey = 'contacts';
  trashKey = 'contactsTrash';


  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Vérifie si le code s'exécute dans un environnement de navigateur (pour éviter les erreurs côté serveur)
    if (typeof window !== 'undefined') {
      this.loadContacts(); // Charge les contacts depuis le localStorage
      this.loadTrash();    // Charge les contacts supprimés depuis le localStorage
    }
  }

  // Charger les contacts depuis le localStorage
  loadContacts(): void {
    const savedContacts = localStorage.getItem(this.storageKey); // Récupère les contacts du localStorage
    console.log('Contacts chargés:', this.contacts); // Vérifiez les données ici
    if (savedContacts) {
      this.contacts = JSON.parse(savedContacts); // Parse et assigne les contacts chargés au tableau contacts
    } else {
      // Si aucun contact n'est trouvé dans le localStorage, initialise avec des contacts par défaut
      this.contacts = [
        {
          id: '1',
          nom: 'Thiam',
          prenom: 'Hapsatou',
          email: 'haps.@gmail.com',
          phone: '123-456-7890',
          status: 'active',
          createdAt: new Date(),
          createdBy: 'admin',
          updatedAt: new Date(),
          updatedBy: 'admin',
          description: ' contact 1'
        },
        {
          id: '2',
          nom: 'Dansoko',
          prenom: 'fatima',
          email: 'fatima.@gmail.com',
          phone: '098-765-4321',
          status: 'active',
          createdAt: new Date(),
          createdBy: 'admin',
          updatedAt: new Date(),
          updatedBy: 'admin',
          description: ' contact 2'
        },
        {
          id: '3',
          nom: 'Ndong',
          prenom: 'Babou',
          email: 'babou.@gmail.com',
          phone: '234-567-8901',
          status: 'active',
          createdAt: new Date(),
          createdBy: 'admin',
          updatedAt: new Date(),
          updatedBy: 'admin',
          description: ' contact 3'
        }
      ];
      this.saveContacts(); // Sauvegarde les contacts initiaux dans le localStorage
    }
  }

  // Charger les contacts supprimés depuis le localStorage
  loadTrash(): void {
    const savedTrash = localStorage.getItem(this.trashKey); // Récupère les contacts supprimés du localStorage
    this.trash = savedTrash ? JSON.parse(savedTrash) : []; // Parse et assigne les contacts supprimés au tableau trash
    console.log('Corbeille chargée:', this.trash); // Vérifiez les données ici
  }

  // Sauvegarder les contacts dans le localStorage
  saveContacts(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.contacts)); // Convertit les contacts en JSON et les sauvegarde
  }

  // Sauvegarder les contacts supprimés dans le localStorage
  saveTrash(): void {
    localStorage.setItem(this.trashKey, JSON.stringify(this.trash)); // Convertit les contacts supprimés en JSON et les sauvegarde
  }

  // Supprimer un contact et le déplacer dans la corbeille
  deleteContact(id: string): void {
    const contactToDelete = this.contacts.find(contact => contact.id === id); // Trouver le contact à supprimer
    if (contactToDelete) {
      this.contacts = this.contacts.filter(contact => contact.id !== id); // Retirer le contact de la liste des contacts
      this.trash.push(contactToDelete); // Ajouter le contact à la corbeille
      this.saveContacts(); // Sauvegarder la liste mise à jour des contacts dans le localStorage
      this.saveTrash();    // Sauvegarder la corbeille mise à jour dans le localStorage
    }
  }

  // Restaurer un contact de la corbeille
  restoreContact(id: string): void {
    const contactToRestore = this.trash.find(contact => contact.id === id); // Trouver le contact à restaurer
    if (contactToRestore) {
      this.trash = this.trash.filter(contact => contact.id !== id); // Retirer le contact de la corbeille
      this.contacts.push(contactToRestore); // Ajouter le contact à la liste des contacts
      this.saveContacts(); // Sauvegarder la liste mise à jour des contacts dans le localStorage
      this.saveTrash();    // Sauvegarder la corbeille mise à jour dans le localStorage
    }
  }
}
