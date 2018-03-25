import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from "@angular/core";
import { Field } from "../../../form/form.types";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { createForm } from "../../../../doer-ngx-core";

@Component({
    selector: 'dr-ngrx-form-layout',
    templateUrl: './ngrx-form-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class NgrxFormLayoutComponent implements OnInit, OnDestroy {

    form: FormGroup;
    private sub: Subscription;

    @Input() fields: Field[];

    constructor(private readonly fb: FormBuilder) {
    }

    ngOnInit(): void {
      this.form = createForm(this.fb)(this.fields);
    }

    ngOnDestroy(): void {
    }

  }
