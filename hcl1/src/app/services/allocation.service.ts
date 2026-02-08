import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Allocation, CreateAllocationDto, UpdateAllocationDto } from '../models/allocation.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/allocations`;

  getAll(): Observable<Allocation[]> {
    return this.http.get<Allocation[]>(this.apiUrl);
  }

  getById(id: number): Observable<Allocation> {
    return this.http.get<Allocation>(`${this.apiUrl}/${id}`);
  }

  getByEmployee(employeeId: number): Observable<Allocation[]> {
    return this.http.get<Allocation[]>(`${this.apiUrl}/employee/${employeeId}`);
  }

  getByProject(projectId: number): Observable<Allocation[]> {
    return this.http.get<Allocation[]>(`${this.apiUrl}/project/${projectId}`);
  }

  create(allocation: CreateAllocationDto): Observable<Allocation> {
    return this.http.post<Allocation>(this.apiUrl, allocation);
  }

  update(id: number, allocation: UpdateAllocationDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, allocation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
