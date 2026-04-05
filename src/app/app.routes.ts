import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'default',
        loadComponent: () => import('./default-layout/default-layout.component').then(m => m.DefaultLayoutComponent),
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'teachers',
                loadComponent: () => import('./teacher/teacher.component').then(m => m.TeacherComponent)
            },
            {
                path: 'departments',
                loadComponent: () => import('./department/department.component').then(m => m.DepartmentComponent)
            }
        ]
    }
];
