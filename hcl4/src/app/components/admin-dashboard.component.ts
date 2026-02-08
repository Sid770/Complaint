import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComplaintService } from '../services/complaint.service';
import { Complaint, StatusUpdateRequest } from '../models/complaint.model';
import { StatusBadgeComponent } from './status-badge.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterLink, StatusBadgeComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashboardComponent implements OnInit {
  private readonly complaintService = inject(ComplaintService);

  complaints = signal<Complaint[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  
  statusOptions: Array<'Open' | 'In Progress' | 'Resolved'> = ['Open', 'In Progress', 'Resolved'];

  statistics = signal({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0
  });

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.loading.set(true);
    this.error.set(null);

    this.complaintService.getAllComplaints().subscribe({
      next: (complaints) => {
        this.complaints.set(complaints);
        this.calculateStatistics(complaints);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load complaints.');
        this.loading.set(false);
        console.error('Error loading complaints:', err);
      }
    });
  }

  calculateStatistics(complaints: Complaint[]): void {
    this.statistics.set({
      total: complaints.length,
      open: complaints.filter(c => c.status === 'Open').length,
      inProgress: complaints.filter(c => c.status === 'In Progress').length,
      resolved: complaints.filter(c => c.status === 'Resolved').length
    });
  }

  updateStatus(complaint: Complaint, newStatus: 'Open' | 'In Progress' | 'Resolved'): void {
    const request: StatusUpdateRequest = { status: newStatus };

    this.complaintService.updateStatus(complaint.id, request).subscribe({
      next: () => {
        this.loadComplaints();
      },
      error: (err) => {
        console.error('Error updating status:', err);
        alert('Failed to update status');
      }
    });
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority.toLowerCase()}`;
  }

  getProgressPercentage(count: number): number {
    const total = this.statistics().total;
    return total > 0 ? (count / total) * 100 : 0;
  }
}
