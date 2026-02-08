import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ComplaintListComponent } from './components/complaint-list.component';
import { ComplaintFormComponent } from './components/complaint-form.component';
import { ComplaintDetailComponent } from './components/complaint-detail.component';
import { AdminDashboardComponent } from './components/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'complaints', component: ComplaintListComponent },
  { path: 'new-complaint', component: ComplaintFormComponent },
  { path: 'complaint/:id', component: ComplaintDetailComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: '**', redirectTo: '' }
];
