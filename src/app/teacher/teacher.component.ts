import { Component, inject, OnInit } from '@angular/core';
import { Teacher } from '../Models/Teacher.model';
import { Department } from '../Models/Department.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../services/alert.service';
declare var bootstrap: any;

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TeacherComponent implements OnInit {
  ngOnInit(): void {
    this.loadDepartments();
    this.loadTeachers();
  }
  private readonly api = inject(ApiService);
  private spinner = inject(NgxSpinnerService);
  private alert = inject(AlertService);

  teachers: Teacher[] = [];
  departments: Department[] = [];
  teacher: Teacher = new Teacher();

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

  loadTeachers(): void {
    this.spinner.show();
    this.api.get('teacher/Get').subscribe({
      next: (res) => {
        if (res.status == 1) {
          if (res.data.length > 0) {
            this.teachers = res.data;
            this.spinner.hide();
          } else {
            this.teachers = [];
            this.spinner.hide();
          }
        }
      },
      error: (err) => {
        console.error('Error fetching teachers', err);
        this.spinner.hide();
      },
    });
  }

  saveTeacher() {
    if (this.teacher.id) {
      this.spinner.show();
      this.api.put('teacher/Update', this.teacher.id, this.teacher).subscribe({
        next: (res) => {
          if (res.status == 1) {
            this.spinner.hide();
            this.loadTeachers();
            this.alert.success('Teacher updated successfully');
          }
        },
        error: (err) => {
          console.error('Error updating teacher', err);
          this.spinner.hide();
        },
      });
    } else {
      this.spinner.show();
      this.api.post('teacher/Insert', this.teacher).subscribe({
        next: (res) => {
          if (res.status == 1) {
            this.loadTeachers();
            this.spinner.hide();
            this.alert.success('Teacher added successfully');
          } else {
            console.error('Error inserting teacher', res);
            this.spinner.hide();
          }
        },
        error: (err) => {
          console.error('Error inserting teacher', err);
          this.spinner.hide();
        },
      });
    }
  }

  editTeacher(t: Teacher, index: number) {
    const modal = new bootstrap.Modal(document.getElementById('teacherModal'));
    modal.show();
    this.teacher = Object.assign({}, t);
  }

  deleteTeacher(id: number) {
    this.alert.confirm('Do you want to delete this teacher?').then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.api.delete('teacher/Delete', id).subscribe({
          next: (res) => {
            if (res.status == 1) {
              this.spinner.hide();
              this.alert.success('Deleted successfully');
              this.loadTeachers();
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

  addTeacher() {
    this.teacher = new Teacher();
  }
}
