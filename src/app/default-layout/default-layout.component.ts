import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../services/alert.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-default-layout',
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterModule,
    NgxSpinnerModule,
  ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
  standalone: true,
})
export class DefaultLayoutComponent {
  private readonly http = inject(ApiService);
  private spinner = inject(NgxSpinnerService);
  private alert = inject(AlertService);
  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['']);
  }

isChatOpen = false;

messages: any[] = [];
question = '';

toggleChat() {
  this.isChatOpen = !this.isChatOpen;
}

send() {
  if (!this.question.trim()) return;

  const userMsg = this.question;

  this.messages.push({ role: 'user', text: userMsg });

  this.http.post('chat/Ask', { question: userMsg }).subscribe(res => {
    this.messages.push({ role: 'bot', text: res.answer });
  });

  this.question = '';
}
}
