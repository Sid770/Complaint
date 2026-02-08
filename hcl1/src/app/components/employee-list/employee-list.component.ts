import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee, CreateEmployeeDto, UpdateEmployeeDto } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  isEditing = false;
  showForm = false;
  filterDepartment = '';

  newEmployee: CreateEmployeeDto = {
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    role: 'Employee',
    joiningDate: new Date().toISOString().split('T')[0],
    isActive: true
  };

  ngOnInit() {
    console.log('EmployeeListComponent initialized');
    this.loadEmployees();
  }

  loadEmployees() {
    console.log('Loading employees from API...');
    this.employeeService.getAll().subscribe({
      next: (data) => {
        console.log('Employees loaded successfully:', data);
        this.employees = data;
        this.filteredEmployees = data;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  filterByDepartment() {
    const term = this.filterDepartment.toLowerCase();
    this.filteredEmployees = term
      ? this.employees.filter(e => e.department.toLowerCase().includes(term))
      : this.employees;
  }

  openAddForm() {
    this.isEditing = false;
    this.showForm = true;
    this.newEmployee = {
      name: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
      role: 'Employee',
      joiningDate: new Date().toISOString().split('T')[0],
      isActive: true
    };
  }

  openEditForm(employee: Employee) {
    this.isEditing = true;
    this.showForm = true;
    this.selectedEmployee = employee;
    this.newEmployee = {
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
      role: employee.role,
      joiningDate: employee.joiningDate.split('T')[0],
      isActive: employee.isActive
    };
  }

  saveEmployee() {
    if (this.isEditing && this.selectedEmployee) {
      const updateDto: UpdateEmployeeDto = {
        name: this.newEmployee.name,
        phone: this.newEmployee.phone,
        department: this.newEmployee.department,
        role: this.newEmployee.role,
        designation: this.newEmployee.designation,
        isActive: this.newEmployee.isActive
      };

      this.employeeService.update(this.selectedEmployee.id!, updateDto).subscribe({
        next: () => {
          this.loadEmployees();
          this.closeForm();
        },
        error: (err) => console.error('Error updating employee:', err)
      });
    } else {
      this.employeeService.create(this.newEmployee).subscribe({
        next: () => {
          this.loadEmployees();
          this.closeForm();
        },
        error: (err) => console.error('Error creating employee:', err)
      });
    }
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.delete(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => console.error('Error deleting employee:', err)
      });
    }
  }

  closeForm() {
    this.showForm = false;
    this.selectedEmployee = null;
  }
}
