export interface Project {
  id?: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'OnHold';
  managerName: string;
  clientName: string;
}

export interface CreateProjectDto {
  name: string;
  description: string;
  startDate: string;
  endDate: string | null;
  status: 'Active' | 'Completed' | 'OnHold';
  managerName: string;
  clientName: string;
}

export interface UpdateProjectDto {
  name: string;
  description: string;
  endDate: string | null;
  status: 'Active' | 'Completed' | 'OnHold';
  managerName: string;
  clientName: string;
}
