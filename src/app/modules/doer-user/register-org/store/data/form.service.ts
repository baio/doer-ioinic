import { Injectable } from "@angular/core";
import { SaveFormFn, LoadFormFn, HttpService, DisplayErrorFn } from "../../../../../libs/doer-ngx-core";
import { ok } from "../../../../../libs/doer-core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/Observable/of";


@Injectable()
export class FormService {

    constructor(private readonly httpService: HttpService) {
    }

    load: LoadFormFn = ({data}) => {
        return of(ok({}));
    }

    save: SaveFormFn = ({data}) =>
        this.httpService.post('register-org', {...data.data, avatar: 'https://image.flaticon.com/icons/svg/149/149071.svg' })

}