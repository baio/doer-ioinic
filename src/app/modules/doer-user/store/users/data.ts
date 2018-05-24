import { Injectable } from '@angular/core';
import {
  SaveFormFn,
  LoadFormFn,
  HttpService,
  DisplayErrorFn
} from '@doer/ngx-core';
import { ok, ObservableResult } from '@doer/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { UsersList } from './types';
import { repeat } from 'ramda';

const DATA =
  {
    id: '10',
    name: 'Petya',
    kind: 'Worker',
    avatar: 'https://static.getjar.com/icon-50x50/f9/883743_thm.png',
    photosCount: 5
  };


@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  load = (): ObservableResult<UsersList> => {
    return of(ok({ items: repeat(DATA, 1000) }));
  };

}
