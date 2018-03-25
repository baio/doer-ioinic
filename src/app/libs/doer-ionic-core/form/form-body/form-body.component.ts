import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from "@angular/core";
import { Field } from "../form.types";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'dr-form-body',
    templateUrl: './form-body.component.html',
     changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class FormBodyComponent implements OnInit, OnDestroy {

    @Input() fields: Field[];
    @Input() form: FormGroup;
    private sub: Subscription;

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    trackByFun(index: number, field: Field) {
        return field.id;
    }


  }
