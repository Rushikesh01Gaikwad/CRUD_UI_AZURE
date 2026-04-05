import { Component } from '@angular/core';
import { Teacher } from '../Models/Teacher.model';
import { Department } from '../Models/Department.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,]
})
export class TeacherComponent {

  teachers: Teacher[] = [];

  departments: Department[] = [
    { Id: 1, Name: 'IT', Remark: '', Teachers: [] },
    { Id: 2, Name: 'HR', Remark: '', Teachers: [] },
    { Id: 3, Name: 'Accounts', Remark: '', Teachers: [] }
  ];

  teacher: Teacher = new Teacher();

  saveTeacher() {

    const dept = this.departments.find(x => x.Id == this.teacher.DepartmentId);

    if (dept) {
      this.teacher.Department = dept;
    }

    this.teachers.push({ ...this.teacher });

    this.teacher = new Teacher();
  }

  editTeacher(t: Teacher, index: number) {

    const modal = new bootstrap.Modal(document.getElementById('teacherModal'));
    modal.show();

  }

  deleteTeacher(index: number) {


  }

}