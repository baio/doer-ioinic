import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core";
import { Field } from "../form.types";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'dr-form-layout',
    templateUrl: './form-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class FormLayoutComponent implements OnInit, OnDestroy {

    private sub: Subscription;

    @Input() fields: Field[];
    @Input() form: FormGroup;
    @Output() save = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<boolean>();

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

  }
