import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule,CommonModule]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    const { name, email, password } = this.registerForm.value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((user: any) => user.email === email)) {
      alert('Email already registered');
      return;
    }
    const newUser = { name, email, password, id: this.generateId() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    // Initialiser les contacts pour ce nouvel utilisateur
    localStorage.setItem(`contacts_${newUser.id}`, JSON.stringify([]));
    this.router.navigate(['/login']);
  }
  
  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}  
