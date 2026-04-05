import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  totalTeachers = 25;
  totalDepartments = 10;
  totalStudents = 350;

  ngAfterViewInit() {
    this.loadCharts();
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
