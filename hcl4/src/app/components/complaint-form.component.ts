import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ComplaintService } from '../services/complaint.service';
import { ComplaintCreateRequest } from '../models/complaint.model';

@Component({
  selector: 'app-complaint-form',
  imports: [ReactiveFormsModule],
  templateUrl: './complaint-form.component.html',
  styleUrl: './complaint-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComplaintFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly complaintService = inject(ComplaintService);
  private readonly router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);

  categories = ['Technical', 'Billing', 'Service', 'Product', 'Other'];
  priorities = ['High', 'Medium', 'Low'];

  complaintForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    category: ['', Validators.required],
    priority: ['', Validators.required],
    createdBy: ['', [Validators.required, Validators.minLength(2)]]
  });

  onSubmit(): void {
    if (this.complaintForm.invalid) {
      Object.keys(this.complaintForm.controls).forEach(key => {
        this.complaintForm.controls[key].markAsTouched();
      });
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const request: ComplaintCreateRequest = this.complaintForm.value;

    this.complaintService.createComplaint(request).subscribe({
      next: () => {
        this.success.set(true);
        this.loading.set(false);
        setTimeout(() => {
          this.router.navigate(['/complaints']);
        }, 1500);
      },
      error: (err) => {
        this.error.set('Failed to create complaint. Please try again.');
        this.loading.set(false);
        console.error('Error creating complaint:', err);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.complaintForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.complaintForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    if (field.errors['required']) return 'This field is required';
    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `Minimum ${minLength} characters required`;
    }
    if (field.errors['maxlength']) {
      const maxLength = field.errors['maxlength'].requiredLength;
      return `Maximum ${maxLength} characters allowed`;
    }
    return '';
  }
}
