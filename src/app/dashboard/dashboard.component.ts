import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private readonly api = inject(ApiService);
  private spinner = inject(NgxSpinnerService);
  private alert = inject(AlertService);

  totalTeachers = 0;
  totalDepartments = 0;
  totalStudents = 350;

  ngAfterViewInit() {
    this.loadData();
    this.loadCharts();
  }


  loadData() {
    this.spinner.show();
    this.api.get('department/Get').subscribe({
      next: (res) => {
        if (res.status == 1) {
          this.totalDepartments = res.data.length;
        }
        this.spinner.hide();

      },
      error: (err) => {
        console.error('Error fetching departments', err);
        this.spinner.hide();
      },
    });

    this.api.get('teacher/Get').subscribe({
      next: (res) => {
        if (res.status == 1) {
          this.totalTeachers = res.data.length;
        }
        this.spinner.hide();

      },
      error: (err) => {
        console.error('Error fetching teachers', err);
        this.spinner.hide();
      },
    });
  }

  loadCharts() {

    // Bar Chart
    new Chart("teacherChart", {
      type: 'bar',
      data: {
        labels: ['IT', 'HR', 'Accounts', 'Science'],
        datasets: [{
          label: 'Teachers per Department',
          data: [8, 5, 6, 6]
        }]
      }
    });

    // Pie Chart
    new Chart("studentChart", {
      type: 'pie',
      data: {
        labels: ['IT', 'HR', 'Accounts'],
        datasets: [{
          data: [120, 90, 140]
        }]
      }
    });

  }

}
