import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  storedData: any = null;
  isEditing: boolean = false;  // Flag to toggle between view and edit mode

  constructor() {
    this.form = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', Validators.required),
      etat: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.loadStoredData();
  }

  loadStoredData() {
    const data = localStorage.getItem('formData');
    if (data) {
      this.storedData = JSON.parse(data);
      this.form.patchValue(this.storedData);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // Enregistrer les données mises à jour dans le Local Storage
      localStorage.setItem('formData', JSON.stringify(this.form.value));
      this.storedData = this.form.value;  // Met à jour la vue avec les nouvelles données
      this.isEditing = false;  // Basculer en mode affichage
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;  // Basculer entre mode édition et affichage
  }
}
