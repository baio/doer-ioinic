import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from "@angular/core";
import { Field } from "../../../form/form.types";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { createForm, FormState, formSelectedData } from "../../../../doer-ngx-core";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'dr-ngrx-form-layout',
    templateUrl: './ngrx-form-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class NgrxFormLayoutComponent implements OnInit, OnDestroy {

    form: FormGroup;
    private sub: Subscription;

    @Input() state$: Observable<FormState>;
    @Input() fields: Field[];

    constructor(private readonly fb: FormBuilder) {
    }

    ngOnInit(): void {

      this.form = createForm(this.fb)(this.fields);

      if (!this.state$) {
        throw new Error('Input property state$ not set!');
      }

      // when state's data changed update form fields
      this.state$.pipe(formSelectedData).subscribe(x => {
        console.log('state data changed', x);
        this.form.patchValue(x, { emitEvent: false })
      })
    }

    ngOnDestroy(): void {
    }

    onSave() {

    }

    onCancel() {

    }



  }
