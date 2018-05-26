import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'dr-take-photo-button',
  template: `
    <input ion-button *ngIf="!isMobile" type="file" [multiple]="true" id="file_input"
      (change)="click.emit($event)">
    <button *ngIf="isMobile" ion-button (click)="click.emit($event)">{{text}}</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TakePhotoButtonComponent {

  @Input() text: string;
  @Output() click = new EventEmitter<void>();

  private readonly isMobile: boolean;

  constructor(platform: Platform) {
    this.isMobile = platform.platforms().indexOf('mobile') !== -1;
  }
}
