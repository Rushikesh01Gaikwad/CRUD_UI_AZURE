import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterModule],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
  standalone: true
})
export class DefaultLayoutComponent {

}
