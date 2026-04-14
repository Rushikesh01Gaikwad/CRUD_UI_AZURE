import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('fileInput') fileInput!: ElementRef;

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

  save() {
    if (this.teacher.id) {
      this.spinner.show();
      this.api.put('teacher/Update', this.teacher.id, this.teacher).subscribe({
        next: (res) => {
          if (res.status == 1) {
            this.spinner.hide();
            this.loadTeachers();
            // 👇 CLOSE MODAL
            const modalElement = document.getElementById('teacherModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
            this.alert.success('Teacher updated successfully');
          } else {
            this.spinner.hide();
            this.alert.error('Error while update');
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
            // 👇 CLOSE MODAL
            const modalElement = document.getElementById('teacherModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal?.hide();
            if (this.fileInput) {
              this.fileInput.nativeElement.value = '';
            }
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
    this.selectedFile = null!;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }

    if (this.teacher.profileImage) {
      this.imagePreview =
        this.api['uploadUrl'] + 'teachers/' + this.teacher.profileImage;
    } else {
      this.imagePreview = null;
    }
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
    this.imagePreview = null;
    this.selectedFile = null!;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile!: File;
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      // 👇 Preview logic
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage() {
    if (!this.imagePreview) {
      this.alert.error('Please upload photographs!');
      return;
    }

    if (!this.selectedFile) {
      this.save();
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    if (!this.teacher.profileImage) {
      this.api
        .UploadImg('upload/UploadTeacherPhoto', formData)
        .subscribe((res: any) => {
          if (res.status == 1) {
            this.teacher.profileImage = res.data.fileName;
            this.save();
          } else {
            this.alert.error('Error while upload profile photos!');
          }
        });
    } else {
      formData.append('oldFileName', this.teacher.profileImage);
      console.log('formData...', formData);

      this.api.UploadImg('upload/UpdateTeacherPhoto', formData).subscribe(
        (res: any) => {
          if (res.status == 1) {
            this.teacher.profileImage = res.data.fileName;
            this.save();
          }
        },
        (error) => {
          this.alert.error('Something went wrong...');
        },
      );
    }
  }
}
