import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'dr-primary-page',
  templateUrl: './primary-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrimaryPageComponent {
  @Input() title: string;
}
