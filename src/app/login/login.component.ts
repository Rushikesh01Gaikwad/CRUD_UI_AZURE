import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../Models/Login.model';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private readonly api = inject(ApiService);
  private spinner = inject(NgxSpinnerService);
  private alert = inject(AlertService);

  isLoginMode = true;

  user: Login = new Login();

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.user = new Login();
  }

  login() {
    if(this.user.Email.trim() === '' || this.user.Password.trim() === '') {
      this.alert.error('Email and Password are required');
      return;
    }
      
    this.spinner.show();
    this.api.post('login/Login', this.user).subscribe({
      next: (res) => {
        if (res.status == 1) {
          this.spinner.hide();
          // this.alert.success('Login successful');
          this.router.navigate(['default/home']);
        } else {
          this.alert.error(res.message);
          this.spinner.hide();
        }
      },
    });
  }

  register() {
    this.spinner.show();
    this.api.post('login/Insert', this.user).subscribe({
      next: (res) => {
        if (res.status == 1) {
          this.alert.success('Registration successful. Please log in.');
          this.user = new Login();
          this.isLoginMode = true;
          this.spinner.hide();
        } else {
          console.error('Error inserting user', res);
          this.spinner.hide();
        }
      },
    });
  }
}
