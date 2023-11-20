import { Component, Input, ViewChild, effect, signal } from '@angular/core';
import { Message } from '../../shared/interfaces/message';
import { NgStyle } from '@angular/common';
import { AuthUser } from '../../shared/data-access/auth.service';
import { CdkScrollable, ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  standalone: true,
  selector: 'app-message-list',
  template: `
    <ul cdkScrollable class="gradient-bg">
      @for (message of messageSignal(); track message.created){
        <li
          [ngStyle]="{
            'flex-direction':
              message.author === activeUser?.email ? 'row-reverse' : 'row'
          }"
        >
          <div class="avatar animate-in-primary">
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed={{
                message.author.split('@')[0]
              }}"
            />
          </div>
          <div class="message animate-in-secondary">
            <small>{{ message.author }}</small>
            <p>
              {{ message.content }}
            </p>
          </div>
        </li>
      }
    </ul>
  `,
  styles: `
    ul {
      height: 100%;
      overflow: scroll;
      list-style-type: none;
      padding: 1rem;
      padding-bottom: 5rem;
      margin: 0;
    }

    li {
      display: flex;
      margin-bottom: 2rem;
    }

    .avatar {
      width: 75px;
      margin: 0 1rem;
      height: auto;
      filter: drop-shadow(2px 3px 5px var(--accent-darker-color));
    }

    .message {
      width: 100%;
      background: var(--white);
      padding: 2rem;
      border-radius: 5px;
      filter: drop-shadow(2px 4px 3px var(--primary-darker-color));
    }
  `,
  imports: [NgStyle, ScrollingModule],
})
export class MessageListComponent {
  messageSignal = signal<Message[]>([]);

  @Input({ required: true }) set messages(value: Message[]) {
    this.messageSignal.set(value);
  }

  @Input({ required: true }) activeUser!: AuthUser;
  @ViewChild(CdkScrollable) scrollContainer!: CdkScrollable;

  constructor() {
    effect(() => {
      if (this.messageSignal().length && this.scrollContainer) {
        this.scrollContainer.scrollTo({ 
          bottom: 0,
          behavior: 'smooth' 
        });
      }
    })
  }
}