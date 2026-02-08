import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>Complaint & Issue Tracking Portal</h1>
        <p class="subtitle">Your centralized system for managing and tracking issues efficiently</p>
        
        <div class="cta-buttons">
          <a routerLink="/new-complaint" class="btn btn-primary btn-large">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Register Complaint
          </a>
          <a routerLink="/complaints" class="btn btn-secondary btn-large">
            View All Complaints
          </a>
        </div>
      </div>

      <div class="features-section">
        <h2>Core Features</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <h3>Register Complaints</h3>
            <p>Easily submit complaints with category and priority tags for quick processing</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <h3>Admin Dashboard</h3>
            <p>Comprehensive dashboard to monitor and update complaint statuses in real-time</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3>Status Lifecycle</h3>
            <p>Track complaints through Open → In Progress → Resolved stages</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3>Comment History</h3>
            <p>Add and view comments to maintain communication history</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h3>Search & Filter</h3>
            <p>Powerful search and filtering by category, status, and keywords</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>Status Badges</h3>
            <p>Visual status indicators for quick complaint identification</p>
          </div>
        </div>
      </div>

      <div class="admin-section">
        <div class="admin-card">
          <h3>Admin Access</h3>
          <p>Manage all complaints and update their status from the admin dashboard</p>
          <a routerLink="/admin" class="btn btn-primary">
            Go to Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .hero-section {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 16px;
      color: white;
      margin-bottom: 4rem;
    }

    .hero-section h1 {
      font-size: 3rem;
      font-weight: 800;
      margin: 0 0 1rem 0;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 1.25rem;
      margin: 0 0 2rem 0;
      opacity: 0.95;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .features-section {
      margin-bottom: 4rem;
    }

    .features-section h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #1F2937;
      text-align: center;
      margin: 0 0 3rem 0;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .feature-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.3s;
    }

    .feature-card:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      transform: translateY(-4px);
    }

    .feature-icon {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1F2937;
      margin: 0 0 0.75rem 0;
    }

    .feature-card p {
      color: #6B7280;
      line-height: 1.6;
      margin: 0;
    }

    .admin-section {
      display: flex;
      justify-content: center;
    }

    .admin-card {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      border-radius: 12px;
      padding: 3rem;
      text-align: center;
      color: white;
      max-width: 600px;
      width: 100%;
    }

    .admin-card h3 {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
    }

    .admin-card p {
      font-size: 1.125rem;
      margin: 0 0 2rem 0;
      opacity: 0.95;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
    }

    .btn-large {
      padding: 1rem 2rem;
      font-size: 1rem;
    }

    .btn-primary {
      background-color: white;
      color: #667eea;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    .btn-secondary {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
      backdrop-filter: blur(10px);
    }

    .btn-secondary:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }

    .admin-card .btn-primary {
      background-color: white;
      color: #f5576c;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1rem;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {}
