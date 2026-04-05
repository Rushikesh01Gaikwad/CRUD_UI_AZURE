import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../Models/Login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private router = inject(Router);

  isLoginMode = true;

  user: Login = new Login();

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.user = new Login();
  }

  login() {
    this.router.navigate(['default/home']);
  }

  register() {
    console.log("Register Data", this.user);
  }

}