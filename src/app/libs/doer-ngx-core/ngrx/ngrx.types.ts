import { ObservableResult, IAction, IResultAction } from "../../doer-core";
import { Observable } from "rxjs/Observable";

export interface Status {
  kind: string;
  latestError?: string;
}

export interface StateWithStatus {
  status: Status;
}

///

export type DisplayErrorFn = (text: string) => void;
export type ActionPred = (action: IAction<any, any>) => boolean;
export type ActionResultFactory = (payload: any) => IResultAction<any, any>;

export type ObservableMap<T1, T2 extends T1 | void> =
  (listActions: Observable<T1>) => Observable<T2>;


///

export type IdPath = string[];

export interface RouterSegment {
    name: string;
    queryParams: { [key: string]: any };
    params: { [key: string]: any };
    path: string[];
    data: any;
}

export interface RoutePrms {
    routeId: IdPath;
    routeSegments: RouterSegment[];
}

export interface EffectFnPrms<T2> extends RoutePrms {
    data: T2|null;
}

export type EffectFn<T1 = any, T2 = EffectFnPrms<any>> = (prms: T2) => ObservableResult<T1>;


// router

export interface RouterStateOutlet extends RouterSegment {
    name: string;
    queryParams: any;
    params: any;
    path: string[];
    data: any;
    children: RouterStateOutlet[];
  }

  export interface RouterStateUrl {
    url: string;
    root: RouterStateOutlet;
  }
