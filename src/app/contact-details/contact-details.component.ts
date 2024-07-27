import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  imports: [CommonModule]
})
export class ContactDetailsComponent implements OnInit {
  contact: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const contactId = this.route.snapshot.paramMap.get('id');
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    this.contact = contacts.find((contact: any) => contact.id === contactId);
  }
}
