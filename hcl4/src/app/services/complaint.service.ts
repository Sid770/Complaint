import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  Complaint, 
  ComplaintCreateRequest, 
  StatusUpdateRequest, 
  CommentRequest,
  Comment 
} from '../models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/api/complaints';

  getAllComplaints(filters?: { category?: string; status?: string; search?: string }): Observable<Complaint[]> {
    let params = new HttpParams();
    
    if (filters?.category) {
      params = params.set('category', filters.category);
    }
    if (filters?.status) {
      params = params.set('status', filters.status);
    }
    if (filters?.search) {
      params = params.set('search', filters.search);
    }

    return this.http.get<Complaint[]>(this.apiUrl, { params });
  }

  getComplaint(id: string): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.apiUrl}/${id}`);
  }

  createComplaint(complaint: ComplaintCreateRequest): Observable<Complaint> {
    return this.http.post<Complaint>(this.apiUrl, complaint);
  }

  updateStatus(id: string, request: StatusUpdateRequest): Observable<Complaint> {
    return this.http.put<Complaint>(`${this.apiUrl}/${id}/status`, request);
  }

  addComment(id: string, request: CommentRequest): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${id}/comments`, request);
  }

  deleteComplaint(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
