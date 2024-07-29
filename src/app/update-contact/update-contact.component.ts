import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.scss']
})
export class UpdateContactComponent implements OnInit {
  contactForm: FormGroup;
  contactId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      etat: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) {
      this.loadContact(this.contactId);
    }
  }

  loadContact(contactId: string): void {
    if (this.isLocalStorageAvailable()) {
      const contacts = JSON.parse(localStorage.getItem('Contacts') || '[]');
      const contact = contacts.find((c: { id: string }) => c.id === contactId);
      if (contact) {
        this.contactForm.patchValue(contact);
      }
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const updatedContact = {
        ...this.contactForm.value,
        id: this.contactId,
        updatedAt: new Date().toISOString()
      };

      if (this.isLocalStorageAvailable()) {
        const contacts = JSON.parse(localStorage.getItem('Contacts') || '[]');
        const updatedContacts = contacts.map((contact: { id: string }) =>
          contact.id === this.contactId ? updatedContact : contact
        );

        localStorage.setItem('Contacts', JSON.stringify(updatedContacts));
      }

      this.router.navigate(['/contacts']);
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

  retour() {
    this.router.navigate(['/contacts']);
  }
}
