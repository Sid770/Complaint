import { Component, signal, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComplaintService } from '../services/complaint.service';
import { Complaint, CommentRequest } from '../models/complaint.model';
import { StatusBadgeComponent } from './status-badge.component';

@Component({
  selector: 'app-complaint-detail',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, StatusBadgeComponent],
  templateUrl: './complaint-detail.component.html',
  styleUrl: './complaint-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplaintDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly complaintService = inject(ComplaintService);

  complaint = signal<Complaint | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  
  commentControl = new FormControl('');
  commentAuthorControl = new FormControl('');
  addingComment = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadComplaint(id);
    }
  }

  loadComplaint(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.complaintService.getComplaint(id).subscribe({
      next: (complaint) => {
        this.complaint.set(complaint);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load complaint details.');
        this.loading.set(false);
        console.error('Error loading complaint:', err);
      }
    });
  }

  addComment(): void {
    const complaint = this.complaint();
    if (!complaint || !this.commentControl.value || !this.commentAuthorControl.value) {
      return;
    }

    this.addingComment.set(true);

    const request: CommentRequest = {
      text: this.commentControl.value,
      author: this.commentAuthorControl.value
    };

    this.complaintService.addComment(complaint.id, request).subscribe({
      next: () => {
        this.commentControl.setValue('');
        this.loadComplaint(complaint.id);
        this.addingComment.set(false);
      },
      error: (err) => {
        this.addingComment.set(false);
        console.error('Error adding comment:', err);
      }
    });
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority.toLowerCase()}`;
  }

  deleteComplaint(): void {
    const complaint = this.complaint();
    if (!complaint) return;

    if (confirm('Are you sure you want to delete this complaint?')) {
      this.complaintService.deleteComplaint(complaint.id).subscribe({
        next: () => {
          this.router.navigate(['/complaints']);
        },
        error: (err) => {
          console.error('Error deleting complaint:', err);
          alert('Failed to delete complaint');
        }
      });
    }
  }
}
