import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private message: NzMessageService
  ) { }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }
}
