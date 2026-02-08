import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    // Basic validation
    if (this.email && this.password) {
      console.log('Login attempt:', { email: this.email, password: '***' });
      // Here you would typically call an authentication service
      alert('Login successful!');
      // Navigate to home or dashboard after login
      this.router.navigate(['/']);
    } else {
      alert('Please fill in all fields');
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
