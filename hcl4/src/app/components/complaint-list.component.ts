import { Component, signal, computed, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComplaintService } from '../services/complaint.service';
import { Complaint } from '../models/complaint.model';
import { StatusBadgeComponent } from './status-badge.component';

@Component({
  selector: 'app-complaint-list',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, StatusBadgeComponent],
  templateUrl: './complaint-list.component.html',
  styleUrl: './complaint-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplaintListComponent implements OnInit {
  private readonly complaintService = inject(ComplaintService);

  complaints = signal<Complaint[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  searchControl = new FormControl('');
  categoryControl = new FormControl('');
  statusControl = new FormControl('');

  categories = ['Technical', 'Billing', 'Service', 'Product', 'Other'];
  statuses = ['Open', 'In Progress', 'Resolved'];

  filteredComplaints = computed(() => {
    return this.complaints();
  });

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.loading.set(true);
    this.error.set(null);

    const filters = {
      category: this.categoryControl.value || undefined,
      status: this.statusControl.value || undefined,
      search: this.searchControl.value || undefined
    };

    this.complaintService.getAllComplaints(filters).subscribe({
      next: (complaints) => {
        this.complaints.set(complaints);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load complaints. Please try again.');
        this.loading.set(false);
        console.error('Error loading complaints:', err);
      }
    });
  }

  onFilterChange(): void {
    this.loadComplaints();
  }

  clearFilters(): void {
    this.searchControl.setValue('');
    this.categoryControl.setValue('');
    this.statusControl.setValue('');
    this.loadComplaints();
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority.toLowerCase()}`;
  }
}
