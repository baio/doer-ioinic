import { Injectable } from '@angular/core';
import { ToastrService as NgxToastrService} from 'ngx-toastr';

export type MessageType = 'warning' | 'error' | 'success' | 'info';

export interface ToastrMessageConfig {
  timeOut: number;
}

export interface Message {
  type: MessageType;
  title?: string | null;
  text?: string | null;
}

@Injectable()
export class ToastrService {

  constructor(private readonly toastrService: NgxToastrService) {}

  show(message: Message, config?: ToastrMessageConfig | null) {
    this.toastrService[message.type](message.text, message.title, config);
  }

}
