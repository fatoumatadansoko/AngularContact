import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suppression',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suppression.component.html',
  styleUrls: ['./suppression.component.scss']
})
export class SuppressionComponent implements OnInit {
  contactId: string | null = null;
  contact: any; // Utilisez 'any' ici ou définissez une interface Contact appropriée

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) {
      this.loadContact(this.contactId);
    }
  }

  loadContact(contactId: string): void {
    if (this.isLocalStorageAvailable()) {
      const contacts = JSON.parse(localStorage.getItem('Contacts') || '[]');
      this.contact = contacts.find((c: { id: string }) => c.id === contactId);
    }
  }

  deleteContact(): void {
    if (this.isLocalStorageAvailable()) {
      const contacts = JSON.parse(localStorage.getItem('Contacts') || '[]');
      const deletedContacts = JSON.parse(localStorage.getItem('DeletedContacts') || '[]');

      // Ajoute le contact supprimé à DeletedContacts
      const contactToDelete = contacts.find((c: { id: string }) => c.id === this.contactId);
      if (contactToDelete) {
        deletedContacts.push(contactToDelete);
        localStorage.setItem('DeletedContacts', JSON.stringify(deletedContacts));
      }

      // Retire le contact de Contacts
      const updatedContacts = contacts.filter((contact: { id: string }) => contact.id !== this.contactId);
      localStorage.setItem('Contacts', JSON.stringify(updatedContacts));

      this.router.navigate(['/contacts']);
    }
  }

  restoreContact(): void {
    if (this.isLocalStorageAvailable()) {
      const deletedContacts = JSON.parse(localStorage.getItem('DeletedContacts') || '[]');
      const contact = deletedContacts.find((c: { id: string }) => c.id === this.contactId);
      if (contact) {
        let contacts = JSON.parse(localStorage.getItem('Contacts') || '[]');
        contacts.push(contact);
        localStorage.setItem('Contacts', JSON.stringify(contacts));

        // Remove from deleted contacts
        const updatedDeletedContacts = deletedContacts.filter((c: { id: string }) => c.id !== this.contactId);
        localStorage.setItem('DeletedContacts', JSON.stringify(updatedDeletedContacts));

        this.router.navigate(['/contacts']);
      }
    }
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

  cancel(): void {
    this.router.navigate(['/contacts']);
  }
}
