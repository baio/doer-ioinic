import { Injectable } from "@angular/core";
import { SaveFormFn, LoadFormFn } from "../../../../../libs/doer-ngx-core";
import { ok } from "../../../../../libs/doer-core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/Observable/of";

@Injectable()
export class FormService {

    constructor(/*private readonly httpService: HttpService*/) {
    }

    load: LoadFormFn = ({data}) => {
        return of(ok({}));
    }

    save: SaveFormFn = ({data}) => {
        return of(ok(data));
    }

}