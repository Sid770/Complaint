import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <div class="hero">
        <h1>Welcome to Our Application</h1>
        <p>Get started by logging in or creating a new account</p>
        <div class="actions">
          <a routerLink="/login" class="btn btn-primary">Login</a>
          <a routerLink="/signup" class="btn btn-secondary">Sign Up</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    }

    .hero {
      text-align: center;
      color: white;
      padding: 2rem;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn {
      padding: 1rem 2rem;
      text-decoration: none;
      border-radius: 5px;
      font-size: 1.1rem;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
      display: inline-block;
    }

    .btn-primary {
      background: white;
      color: #667eea;
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid white;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
  `]
})
export class HomeComponent {}
