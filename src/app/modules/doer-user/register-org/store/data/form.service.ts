import { Injectable } from '@angular/core';
import {
  SaveFormFn,
  LoadFormFn,
  HttpService,
  DisplayErrorFn
} from '@doer/ngx-core';
import { ok } from '@doer/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';

@Injectable()
export class FormService {
  constructor(private readonly httpService: HttpService) {}

  load: LoadFormFn = ({ data }) => {
    return of(ok({}));
  };

  save: SaveFormFn = ({ data }) =>
    this.httpService.post('orgs/register', { ...data.data });
}
