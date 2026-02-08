import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AllocationService } from '../../services/allocation.service';
import { EmployeeService } from '../../services/employee.service';
import { ProjectService } from '../../services/project.service';
import { Allocation, CreateAllocationDto, UpdateAllocationDto } from '../../models/allocation.model';
import { Employee } from '../../models/employee.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-allocation-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './allocation-list.component.html',
  styleUrls: ['./allocation-list.component.css']
})
export class AllocationListComponent implements OnInit {
  private allocationService = inject(AllocationService);
  private employeeService = inject(EmployeeService);
  private projectService = inject(ProjectService);
  
  allocations: Allocation[] = [];
  employees: Employee[] = [];
  projects: Project[] = [];
  selectedAllocation: Allocation | null = null;
  isEditing = false;
  showForm = false;

  newAllocation: CreateAllocationDto = {
    employeeId: 0,
    projectId: 0,
    allocationPercentage: 50,
    allocationDate: new Date().toISOString().split('T')[0],
    releaseDate: null,
    remarks: ''
  };

  ngOnInit() {
    console.log('AllocationListComponent initialized');
    this.loadAllocations();
    this.loadEmployees();
    this.loadProjects();
  }

  loadAllocations() {
    console.log('Loading allocations from API...');
    this.allocationService.getAll().subscribe({
      next: (data) => {
        console.log('Allocations loaded successfully:', data);
        this.allocations = data;
      },
      error: (err) => {
        console.error('Error loading allocations:', err);
      }
    });
  }

  loadEmployees() {
    console.log('Loading employees for dropdown...');
    this.employeeService.getAll().subscribe({
      next: (data) => {
        console.log('Employees loaded:', data);
        this.employees = data;
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      }
    });
  }

  loadProjects() {
    console.log('Loading projects for dropdown...');
    this.projectService.getAll().subscribe({
      next: (data) => {
        console.log('Projects loaded:', data);
        this.projects = data;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
      }
    });
  }

  openAddForm() {
    this.isEditing = false;
    this.showForm = true;
    this.newAllocation = {
      employeeId: 0,
      projectId: 0,
      allocationPercentage: 50,
      allocationDate: new Date().toISOString().split('T')[0],
      releaseDate: null,
      remarks: ''
    };
  }

  openEditForm(allocation: Allocation) {
    this.isEditing = true;
    this.showForm = true;
    this.selectedAllocation = allocation;
    this.newAllocation = {
      employeeId: allocation.employeeId,
      projectId: allocation.projectId,
      allocationPercentage: allocation.allocationPercentage,
      allocationDate: allocation.allocationDate.split('T')[0],
      releaseDate: allocation.releaseDate ? allocation.releaseDate.split('T')[0] : null,
      remarks: allocation.remarks
    };
  }

  saveAllocation() {
    if (this.isEditing && this.selectedAllocation) {
      const updateDto: UpdateAllocationDto = {
        releaseDate: this.newAllocation.releaseDate || null,
        allocationPercentage: this.newAllocation.allocationPercentage,
        remarks: this.newAllocation.remarks
      };
      
      this.allocationService.update(this.selectedAllocation.id!, updateDto).subscribe({
        next: () => {
          this.loadAllocations();
          this.closeForm();
        },
        error: (err) => console.error('Error updating allocation:', err)
      });
    } else {
      const createDto: CreateAllocationDto = {
        ...this.newAllocation,
        releaseDate: this.newAllocation.releaseDate || null
      };

      this.allocationService.create(createDto).subscribe({
        next: () => {
          this.loadAllocations();
          this.closeForm();
        },
        error: (err) => console.error('Error creating allocation:', err)
      });
    }
  }

  deleteAllocation(id: number) {
    if (confirm('Are you sure you want to delete this allocation?')) {
      this.allocationService.delete(id).subscribe({
        next: () => this.loadAllocations(),
        error: (err) => console.error('Error deleting allocation:', err)
      });
    }
  }

  closeForm() {
    this.showForm = false;
    this.selectedAllocation = null;
  }
}
