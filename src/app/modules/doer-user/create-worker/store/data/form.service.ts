import { Injectable } from '@angular/core';
import {
  SaveFormFn,
  LoadFormFn,
  HttpService,
  DisplayErrorFn
} from '@doer/ngx-core';
import { ok, mapR$ } from '@doer/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';

const DEFAULT_AVATAR = 'https://static.getjar.com/icon-50x50/f9/883743_thm.png';

@Injectable()
export class FormService {
  constructor(private readonly httpService: HttpService) {}

  load: LoadFormFn = ({ data }) => {
    return of(ok({}));
  }

  save: SaveFormFn = ({ data }) =>
    this.httpService.post('workers', { ...data.data }).pipe(mapR$(id => ({
      ...data.data,
      id,
      avatar: DEFAULT_AVATAR,
      photosCount: 0
    })))
}
