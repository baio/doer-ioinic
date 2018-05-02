import { Injectable, Optional, InjectionToken, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { pipe, prop, compose, propOr, toPairs, when, isNil, always, forEach, apply } from 'ramda';
import { Http, Headers, Response } from '@angular/http';
import { AuthService } from '../auth/auth.service';
import { map, catchError, tap, flatMap } from 'rxjs/operators';
import { HttpConfig, HttpError } from './http.types';
import { of } from 'rxjs/Observable/of';
import { err, ok, ObservableResult, Result } from '../../doer-core';
import { fromPromise } from 'rxjs/observable/fromPromise';

const parseServerSuccess = (response: Response) => parseServerResponseJson(response);

const mapSuccess = (response: Response)  => {
  return response.ok ? ok(parseServerSuccess(response)) : err(parseServerError(response));
};

// Errors

const parseServerResponseJson = (response: Response) => {
    let json;
    try {
        json = response.text() ? response.json() : null;
    } catch (e) {
        json = null;
    }
    return json;
  };

const parseServerError = (response: Response): HttpError => {

    if (response.status === 0) {
        return {code: 'CONNECTION_LOST', msg: null };
    }

    // const json = parseServerResponseJson(response);
    const msg = response.statusText;

    return {code: response.status, msg };
};

const mapError = compose(err, parseServerError);

interface HttpMethod {
    url: string;
    headers: {[key: string]: string} | null;
}

interface HttpGetLike extends HttpMethod {
    kind: 'HttpGetLike',
    method: 'GET' | 'DELETE';
    search: {[key: string]: string} | null;
}

interface HttpPostLike extends HttpMethod {
    kind: 'HttpPostLike',
    method: 'POST' | 'PUT' | 'PATCH';
    body: any | null;
}

type HttpRequest = HttpGetLike | HttpPostLike;

export const HTTP_CONFIG = new InjectionToken<HttpConfig>('HTTP_CONFIG');
// export const HTTP_AUTH_SERVICE = new InjectionToken<HttpConfig>('HTTP_AUTH_SERVICE');

@Injectable()
export class HttpService {


  constructor(
      private http: Http,
      @Optional() @Inject(HTTP_CONFIG) private config: HttpConfig,
      @Optional() @Inject(AuthService) private authService: AuthService | null
    )
    {
    }

  setConfig(config: HttpConfig) {
    console.log('HttpService::setConfig', config);
    this.config = config;
  }

  request<T = any>(request: HttpRequest): ObservableResult<T> {

    console.log('HttpService::get', this.config);
    const wholeUrl = propOr('', 'baseUrl', this.config) + request.url;

    // append headers
    const headers = new Headers();

    /*
    if (this.authService && this.authService.token) {
      headers.append('Authorization', this.authService.token);
    }
    */

    pipe(
        when(isNil, always({})),
        toPairs,
        forEach(apply(headers.append))
    )(request.headers);

    // append search params
    const search = new URLSearchParams();

    if (request.kind === 'HttpGetLike') {
        // append search
        pipe(
            when(isNil, always({})),
            toPairs,
            forEach(apply(search.append))
        )(request.search);
    }

    let body = null;
    if (request.kind === 'HttpPostLike') {
        body = request.body;
    }

    const requsetWithHeaders = h => this.http.request(wholeUrl, { headers: h, search, body, method: request.method })
        .pipe(map(mapSuccess))
        .pipe(
            catchError(pipe(mapError, of)) as any
        ) as Observable<Result<T>>;

    return fromPromise(this.authService ? this.authService.token : Promise.resolve(null)).pipe(
            map(token => {
                if (token) {
                    headers.append('Authorization', token);
                }
                return headers;
            }),
            flatMap(requsetWithHeaders)
        )
  }

  get = <T=any>(url: string, search?: { [key: string] : string } | null, headers?: { [key: string] : string } | null) =>
    this.request<T>({url, search, headers, method: 'GET', kind: 'HttpGetLike'});

  post = <T=any>(url: string, body?: any | null, headers?: { [key: string] : string } | null) =>
    this.request<T>({url, body, headers, method: 'POST', kind: 'HttpPostLike'});

}
