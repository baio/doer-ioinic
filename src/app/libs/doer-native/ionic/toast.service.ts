import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Message, ToastrMessageConfig } from '@doer/ngx-core';

/*
    message?: string;
    cssClass?: string;
    duration?: number;
    showCloseButton?: boolean;
    closeButtonText?: string;
    dismissOnPageChange?: boolean;
    position?: string;

*/
@Injectable()
export class ToastService {

  constructor(private readonly toastrController: ToastController) {}

  show(message: Message, config?: ToastrMessageConfig | null) {
      return this.toastrController.create({message: message.text}).present();
  }

}
