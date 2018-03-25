import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from "@angular/core";
import { Field } from "../form.types";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'dr-form-body',
    templateUrl: './form-body.component.html',
     // changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class FormBodyComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    @Input() fields: Field[];
    @Input() form: FormGroup;

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    trackByFun(index: number, field: Field) {
        return field.id;
    }


  }
