import { Component, inject, OnInit } from '@angular/core';
import { Department } from '../Models/Department.model';
import { Teacher } from '../Models/Teacher.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../services/alert.service';
declare var bootstrap: any;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DepartmentComponent implements OnInit {
  ngOnInit(): void {
    this.loadDepartments();
  }
  private readonly api = inject(ApiService);
  private spinner = inject(NgxSpinnerService);
  private alert = inject(AlertService);

  departments: Department[] = [];
  department: Department = new Department();

  loadDepartments(): void {
    this.spinner.show();
    this.api.get('department/Get').subscribe({
      next: (res) => {
        if (res.status == 1) {
          if (res.data.length > 0) {
            this.departments = res.data;
            this.spinner.hide();
          } else {
            this.departments = [];
            this.spinner.hide();
          }
        }
      },
      error: (err) => {
        console.error('Error fetching departments', err);
        this.spinner.hide();
      },
    });
  }

  saveDepartment() {
    if (this.department.id) {
      this.spinner.show();
      this.api
        .put('department/Update', this.department.id, this.department)
        .subscribe({
          next: (res) => {
            if (res.status == 1) {
              this.spinner.hide();
              this.loadDepartments();
            } else {
              console.error('Error updating department', res);
              this.spinner.hide();
            }
          },
        });
    } else {
      this.spinner.show();
      this.api.post('department/Insert', this.department).subscribe({
        next: (res) => {
          if (res.status == 1) {
            this.loadDepartments();
            this.spinner.hide();
          } else {
            console.error('Error inserting department', res);
            this.spinner.hide();
          }
        },
      });
    }
  }

  editDepartment(dept: Department, index: number) {
    const modal = new bootstrap.Modal(
      document.getElementById('departmentModal'),
    );
    modal.show();
    this.department = Object.assign({}, dept);
  }

  deleteDepartment(id: number) {
    this.alert
      .confirm('Do you want to delete this department?')
      .then((result) => {
        if (result.isConfirmed) {
          this.spinner.show();
          this.api.delete('department/Delete', id).subscribe({
            next: (res) => {
              if (res.status == 1) {
                this.spinner.hide();
                this.alert.success('Deleted successfully');
                this.loadDepartments();
              } else {
                this.spinner.hide();
                this.alert.error(res.message);
              }
            },
            error: () => {
              this.spinner.hide();
              this.alert.error('Delete failed');
            },
          });
        }
      });
  }
  addDepartment() {
    this.department = new Department();
  }
}
