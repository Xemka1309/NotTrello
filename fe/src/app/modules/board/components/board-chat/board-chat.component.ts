import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-board-chat',
  templateUrl: './board-chat.component.html',
  styleUrls: ['./board-chat.component.css'],
})



export class BoardChatComponent {

  constructor(){ }

  @Input()
  messages: Message[];
  message: string = '';
  @Output()
  messageSended = new EventEmitter<string>();
  dragPosition = { x: 0, y: 0 };
  @Input()
  hideKHuyam: boolean;
  changePosition() {
    this.dragPosition = { x: this.dragPosition.x + 50, y: this.dragPosition.y + 50 };
  }
  sendMessage() {
    if (!this.message || this.message.length < 3) {
      return;
    }
    this.messageSended.emit(this.message);
  }

}
