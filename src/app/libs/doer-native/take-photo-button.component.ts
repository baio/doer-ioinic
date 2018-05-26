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
    <button ion-button *ngIf="isMobile" (click)="take.emit($event)">{{text}}</button>
    <input ion-button *ngIf="!isMobile" type="file" [multiple]="true" id="file_input"
      (change)="take.emit($event);">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TakePhotoButtonComponent {

  @Input() text: string;
  @Output() take = new EventEmitter<void>();

  private readonly isMobile: boolean;

  constructor(platform: Platform) {
    this.isMobile = platform.platforms().indexOf('mobile') !== -1;
  }
}
