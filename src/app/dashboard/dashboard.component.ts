import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../services/alert.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly api = inject(ApiService);
  private spinner = inject(NgxSpinnerService);
  private alert = inject(AlertService);

  totalTeachers = 0;
  totalDepartments = 0;
  totalStudents = 350;
  teacherChart: any;
studentChart: any;

  ngAfterViewInit() {
    this.loadData();
  }

  loadData() {
  this.spinner.show();

  forkJoin({
    departments: this.api.get('department/Get'),
    teachers: this.api.get('teacher/Get')
  }).subscribe({
    next: (res: any) => {
      const departments = res.departments.data;
      const teachers = res.teachers.data;

      this.totalDepartments = departments.length;
      this.totalTeachers = teachers.length;

      this.tryBuildChart(departments, teachers);
      this.spinner.hide();
    },
    error: () => this.spinner.hide()
  });
}

  getTeachersPerDepartment(departments: any[], teachers: any[]) {
  const result: { label: string; count: number }[] = [];

  departments.forEach(dept => {
    const count = teachers.filter(t => t.departmentID === dept.id).length;

    result.push({
      label: dept.name,
      count: count
    });
  });

  return result;
}

tryBuildChart(departments: any[], teachers: any[]) {
  if (!departments.length || !teachers.length) return;

  const data = this.getTeachersPerDepartment(departments, teachers);

  const labels = data.map(x => x.label);
  const values = data.map(x => x.count);

  this.createTeacherChart(labels, values);

  // ✅ also create second chart
  this.createStudentChart(labels, values);
}

createTeacherChart(labels: string[], values: number[]) {

  if (this.teacherChart) {
    this.teacherChart.destroy(); // ✅ destroy old chart
  }

  this.teacherChart = new Chart("teacherChart", {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Teachers per Department',
        data: values,
        backgroundColor: '#4e73df'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

createStudentChart(labels: string[], values: number[]) {

  if (this.studentChart) {
    this.studentChart.destroy(); // ✅ destroy old chart
  }

  this.studentChart = new Chart("studentChart", {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: ['#36A2EB', '#FF6384', '#FF9F40', '#4BC0C0']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%'
    }
  });
}
}
