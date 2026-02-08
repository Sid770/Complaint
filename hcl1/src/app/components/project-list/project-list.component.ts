import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project, CreateProjectDto, UpdateProjectDto } from '../../models/project.model';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  private projectService = inject(ProjectService);
  
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedProject: Project | null = null;
  isEditing = false;
  showForm = false;
  filterStatus = '';

  newProject: CreateProjectDto = {
    name: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    status: 'Active',
    managerName: '',
    clientName: ''
  };

  ngOnInit() {
    console.log('ProjectListComponent initialized');
    this.loadProjects();
  }

  loadProjects() {
    console.log('Loading projects from API...');
    this.projectService.getAll().subscribe({
      next: (data) => {
        console.log('Projects loaded successfully:', data);
        this.projects = data;
        this.filteredProjects = data;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  filterByStatus() {
    const term = this.filterStatus.toLowerCase();
    this.filteredProjects = term
      ? this.projects.filter(p => p.status.toLowerCase() === term)
      : this.projects;
  }

  openAddForm() {
    this.isEditing = false;
    this.showForm = true;
    this.newProject = {
      name: '',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      managerName: '',
      clientName: ''
    };
  }

  openEditForm(project: Project) {
    this.isEditing = true;
    this.showForm = true;
    this.selectedProject = project;
    this.newProject = {
      name: project.name,
      description: project.description,
      startDate: project.startDate.split('T')[0],
      endDate: project.endDate ? project.endDate.split('T')[0] : '',
      status: project.status,
      managerName: project.managerName,
      clientName: project.clientName
    };
  }

  saveProject() {
    if (this.isEditing && this.selectedProject) {
      const updateDto: UpdateProjectDto = {
        name: this.newProject.name,
        description: this.newProject.description,
        endDate: this.newProject.endDate || null,
        status: this.newProject.status,
        managerName: this.newProject.managerName,
        clientName: this.newProject.clientName
      };
      
      this.projectService.update(this.selectedProject.id!, updateDto).subscribe({
        next: () => {
          this.loadProjects();
          this.closeForm();
        },
        error: (err) => console.error('Error updating project:', err)
      });
    } else {
      const createDto: CreateProjectDto = {
        ...this.newProject,
        endDate: this.newProject.endDate || null
      };

      this.projectService.create(createDto).subscribe({
        next: () => {
          this.loadProjects();
          this.closeForm();
        },
        error: (err) => console.error('Error creating project:', err)
      });
    }
  }

  deleteProject(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.delete(id).subscribe({
        next: () => this.loadProjects(),
        error: (err) => console.error('Error deleting project:', err)
      });
    }
  }

  closeForm() {
    this.showForm = false;
    this.selectedProject = null;
  }
}
