import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";
import { Field } from "../../../form/form.types";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { createForm, FormState, formSelectedData, FormAction, updateFormValues, saveFormAction, formSelectSuccessStatusKind, formValueChangedAction } from "../../../../doer-ngx-core";
import { Observable } from "rxjs/Observable";
import { distinctUntilChanged } from "rxjs/operators";
import { equals } from "ramda";


@Component({
    selector: 'dr-ngrx-form-layout',
    templateUrl: './ngrx-form-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class NgrxFormLayoutComponent implements OnInit, OnDestroy {

    form: FormGroup;
    private sub1: Subscription;
    private sub2: Subscription;
    private sub3: Subscription;
    private sub4: Subscription;

    @Input() state$: Observable<FormState>;
    @Input() fields: Field[];
    // if you want update form state immediately after some field value changed,
    // in other case state will be changed only after form's data successfull update, i.e. FormStateStatusUpdated
    @Input() dispatchFormValueChangedAction: boolean;

    @Output() action = new EventEmitter<FormAction>();
    @Output() complete = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    constructor(private readonly fb: FormBuilder) {
    }

    ngOnInit(): void {

      this.form = createForm(this.fb)(this.fields);

      if (!this.state$) {
        throw new Error('Input property state$ not set!');
      }

      // when state's data changed update form fields
      this.sub1 = this.state$.pipe(formSelectedData).subscribe(x => {
        console.log('state data changed', x);
        updateFormValues(this.form)(x);
      });


      // when update succeed, mark form as pristine and emit complete event
      this.sub2 = this.state$.pipe(formSelectSuccessStatusKind('FormStateStatusUpdated'))
      .subscribe(x => {
        console.log('form update success', x);
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.complete.emit();
      });

      // when form's data load succeed, mark form as untouched
      this.sub3 = this.state$.pipe(formSelectSuccessStatusKind('FormStateStatusLoaded'))
      .subscribe(x => {
        console.log('form load success', x);
        this.form.markAsUntouched();
      });

      if (this.dispatchFormValueChangedAction) {
        this.sub4 = this.form.valueChanges
          .pipe(
            distinctUntilChanged(equals)
          ).subscribe(x => {
            console.log('value changed', x);
            this.action.emit(formValueChangedAction(x));
          });
      }
    }

    ngOnDestroy(): void {
      this.sub1.unsubscribe();
      this.sub2.unsubscribe();
      this.sub3.unsubscribe();
      if (this.sub4) {
        this.sub4.unsubscribe();
      }
    }

    onSave() {
      this.action.emit(saveFormAction(this.form.value));
    }

    onCancel() {
      this.cancel.emit();
    }


  }
