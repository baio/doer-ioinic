import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Field, ionicGoAction } from '../../../../libs/doer-ionic-core';
import { Store } from '@ngrx/store';
import {
  CreateWorkerFormStore,
  CreateWorkerFormState
} from '../create-worker.types';
import { Observable } from 'rxjs/Observable';
import { selectFormSubState, subFormAction } from '../store';
import { FormState, FormAction } from '../../../../libs/doer-ngx-core';
import { IonicPage } from 'ionic-angular';

@IonicPage({ name: 'create-worker' })
@Component({
  selector: 'dr-user-create-worker-page',
  templateUrl: './create-worker-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateWorkerPageComponent {
  readonly formState$: Observable<FormState>;
  fields: Field[];

  constructor(private readonly store: Store<CreateWorkerFormStore>) {
    this.formState$ = store.select(selectFormSubState);

    this.fields = [
      {
        kind: 'TextField' as 'TextField',
        id: 'lastName',
        label: 'Фамилия',
        validation: { required: true }
      },
      {
        kind: 'TextField' as 'TextField',
        id: 'firstName',
        label: 'Имя',
        validation: { required: true }
      },
      {
        kind: 'TextField' as 'TextField',
        id: 'middleName',
        label: 'Очество'
      },
      {
        kind: 'TextField' as 'TextField',
        id: 'email',
        label: 'Email',
        validation: { required: true }
      },
      {
        kind: 'TextField' as 'TextField',
        id: 'phone',
        label: 'Телефон'
      }
    ];
  }

  onAction(action: FormAction) {
    this.store.dispatch(subFormAction(action));
  }

  onComplete() {

    console.log('complete ++++');
  }

  onCancel() {

    console.log('cancel ++++');
  }
}
