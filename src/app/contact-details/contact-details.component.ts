import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  imports: [CommonModule]
})
export class ContactDetailsComponent implements OnInit {
  contact: any;

  constructor(private route: ActivatedRoute, private router: Router) { }
 
  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.loadContact(contactId);
    }
  }

  loadContact(contactId: string): void {
    if (this.isLocalStorageAvailable()) {
      const contacts = JSON.parse(localStorage.getItem('Contacts') || '[]');
      this.contact = contacts.find((c: { id: string }) => c.id === contactId);
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
  update(contactId: string): void {
    this.router.navigate(['/update-contact', contactId]);
  }
  retour() {
    this.router.navigate(['/contacts']);
  }
  delete(contactId: string): void {
    this.router.navigate(['/suppression', contactId]);
  }
}
