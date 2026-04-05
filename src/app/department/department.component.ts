import { Component } from '@angular/core';
import { Department } from '../Models/Department.model';
import { Teacher } from '../Models/Teacher.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DepartmentComponent {

  departments: Department[] = [];
  department: Department = new Department();

  saveDepartment() {

    this.departments.push({ ...this.department });

    this.department = new Department();
  }

  editDepartment(dept: Department, index: number) {

    const modal = new bootstrap.Modal(document.getElementById('departmentModal'));
    modal.show();

  }

  deleteDepartment(index: number) {



  }


}