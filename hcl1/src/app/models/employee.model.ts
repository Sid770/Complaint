export interface Employee {
  id?: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  role: 'Admin' | 'Manager' | 'Employee';
  joiningDate: string;
  isActive: boolean;
}

export interface CreateEmployeeDto {
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  role: 'Admin' | 'Manager' | 'Employee';
  joiningDate: string;
  isActive: boolean;
}

export interface UpdateEmployeeDto {
  name: string;
  phone: string;
  department: string;
  role: 'Admin' | 'Manager' | 'Employee';
  designation: string;
  isActive: boolean;
}
