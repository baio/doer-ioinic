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
    <button ion-button (click)="click.emit($event)">{{text}}</button>
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
