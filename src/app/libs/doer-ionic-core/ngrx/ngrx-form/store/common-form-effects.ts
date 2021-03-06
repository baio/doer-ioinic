import { CommonFormEffectsBase, ActionPred, DisplayErrorFn, FormWrap, SelectRoutePrms, DisplayBusyFn, SelectFormState, LoadFormFn, SaveFormFn, CommonFormEffectTypes } from "../../../../doer-ngx-core";
import { Store } from "@ngrx/store";
import { Actions } from "@ngrx/effects";
import { mapTo } from "rxjs/operators";

/*
const errFn: DisplayErrorFn = err => {
    const t = ReflectiveInjector.resolveAndCreate([App, ToastController, Config, Platform]);
    const toastController: ToastController = t.get(ToastController);
    console.log(toastController);
    const toast = toastController.create({message: err.toString()});
    toast.present();
    console.error(err);
};
*/

const busyFn: DisplayBusyFn = id => f => {
    console.info('busy : ', f);
};

const selectRotePrms: SelectRoutePrms = store$ => store$.pipe(mapTo({
    routeId: [],
    routeSegments: []
}));

// by convention all forms have structure { subForm : FormState }
const selectFormState = (storage: any) => storage.subForm;

export class CommonFormEffects extends CommonFormEffectsBase {

    constructor(
      store$: Store<any>,
      actions$: Actions,
      wrap: FormWrap,
      load: LoadFormFn,
      save: SaveFormFn,
      errFn: DisplayErrorFn,
      busyPreds?: [ ActionPred[], ActionPred [] ] | null
    )
    {



        super(
            store$,
            actions$,
            errFn,
            busyFn,
            wrap,
            selectRotePrms,
            selectFormState,
            load,
            save,
            busyPreds
        );
    }


  }
