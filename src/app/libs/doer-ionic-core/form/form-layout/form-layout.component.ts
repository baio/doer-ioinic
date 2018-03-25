import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from "@angular/core";
import { Field } from "../form.types";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'dr-form-layout',
    templateUrl: './form-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class FormLayoutComponent implements OnInit, OnDestroy {

    @Input() fields: Field[];
    @Input() form: FormGroup;
    private sub: Subscription;

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

  }
