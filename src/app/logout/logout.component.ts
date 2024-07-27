import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '<p>Logging out...</p>',
})
export class LogoutComponent {
  constructor(private router: Router) {
    // Effacer les informations de l'utilisateur de localStorage
    localStorage.removeItem('currentUser');
    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }
}
