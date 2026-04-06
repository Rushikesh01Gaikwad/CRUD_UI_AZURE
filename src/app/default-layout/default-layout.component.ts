import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';


@Component({
  selector: 'app-default-layout',
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterModule, NgxSpinnerModule,],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
  standalone: true
})
export class DefaultLayoutComponent {

  constructor(private router: Router) { }

  logout():void{
    this.router.navigate  (['']);
  }

}
