import { Injectable } from "@angular/core";
import { SaveFormFn, LoadFormFn } from "../../../../../libs/doer-ngx-core";
import { ok } from "../../../../../libs/doer-core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/Observable/of";

@Injectable()
export class FormService {

    constructor(private readonly formService: FormService) {
    }

    load: LoadFormFn = ({data}) => {
        return of(ok(null));
    }

    save: SaveFormFn = ({data}) => {
        return of(ok(data));
    }

}