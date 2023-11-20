import { Component, effect, inject } from '@angular/core';
import { MessageListComponent } from "./ui/message-list.component";
import { MessageService } from '../shared/data-access/message.service';
import { MessageInputComponent } from "./ui/message-input.component";
import { AuthService } from '../shared/data-access/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <div class="container">
      <mat-toolbar color="primary">
        <span class="spacer"></span>
        <button mat-icon-button (click)="authService.logout()">
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar>
      <app-message-list [messages]="messageService.messages()" />
      <app-message-input (send)="messageService.add$.next($event)" />
    </div>
  `,
  imports: [
    MessageListComponent, 
    MessageInputComponent, 
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule
  ],
})
export default class HomeComponent {
  messageService = inject(MessageService);
  authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (!this.authService.user()) {
        this.router.navigate(['auth', 'login']);
      }
    });
  }
}