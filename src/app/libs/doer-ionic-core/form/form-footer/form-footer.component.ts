import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';
import { Field } from '../form.types';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dr-form-footer',
  templateUrl: './form-footer.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFooterComponent {
  @Input() form: FormGroup;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<boolean>();

  onSave() {
    this.save.emit(this.form.value);
  }

  onCancel() {
    this.cancel.emit(this.form.dirty);
  }
}
