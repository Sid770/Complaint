export interface Allocation {
  id?: number;
  employeeId: number;
  projectId: number;
  allocationPercentage: number;
  allocationDate: string;
  releaseDate: string | null;
  remarks: string;
  employeeName?: string;
  projectName?: string;
}

export interface CreateAllocationDto {
  employeeId: number;
  projectId: number;
  allocationPercentage: number;
  allocationDate: string;
  releaseDate: string | null;
  remarks: string;
}

export interface UpdateAllocationDto {
  releaseDate: string | null;
  allocationPercentage: number;
  remarks: string;
}
